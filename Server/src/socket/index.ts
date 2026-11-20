import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import redisClient from '../config/redis.js'
import User from '../models/User.js'
import { ConversationService } from '../services/conversationService.js'
import type { IAuthPayload } from '../types/index.js'

type SocketUser = IAuthPayload & { name?: string }

let io: Server | null = null

// userId -> socket ids (a user can have several tabs open)
const onlineSockets = new Map<string, Set<string>>()

const conversationRoom = (conversationId: string) => `conversation:${conversationId}`
const userRoom = (userId: string) => `user:${userId}`

const conversationIdOrNull = (value: unknown): string | null =>
  typeof value === 'string' && value.trim().length > 0 ? value : null

export const isUserOnline = (userId: string) =>
  (onlineSockets.get(userId)?.size ?? 0) > 0

const announcePresence = (userId: string, online: boolean) => {
  io?.emit('presence:update', { userId, online })
}

export const initSocket = (server: HttpServer) => {
  const isDevelopment =
    process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://success-bridge-ten.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ].filter(Boolean) as string[]

  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        const allowed =
          !origin ||
          allowedOrigins.includes(origin) ||
          origin.endsWith('.vercel.app') ||
          origin === 'https://successbridge.pages.dev' ||
          origin.endsWith('.successbridge.pages.dev') ||
          (isDevelopment &&
            (origin.includes('localhost') || origin.includes('127.0.0.1')))
        callback(allowed ? null : new Error('Not allowed by CORS'), allowed)
      },
      credentials: true,
    },
  })

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.query?.token
      if (typeof token !== 'string' || !token) {
        return next(new Error('unauthorized'))
      }

      if (redisClient && redisClient.isOpen) {
        const isBlacklisted = await redisClient.get(`blacklist_${token}`)
        if (isBlacklisted) return next(new Error('unauthorized'))
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret',
      ) as IAuthPayload

      const user = await User.findByPk(decoded.userId, {
        attributes: ['id', 'name', 'role'],
      })
      if (!user) return next(new Error('unauthorized'))

      socket.data.user = {
        ...decoded,
        id: decoded.userId,
        name: user.name,
        role: user.role,
      } as SocketUser

      next()
    } catch {
      next(new Error('unauthorized'))
    }
  })

  io.on('connection', (socket: Socket) => {
    const user = socket.data.user as SocketUser

    const userSockets = onlineSockets.get(user.id) ?? new Set<string>()
    const firstConnection = userSockets.size === 0
    userSockets.add(socket.id)
    onlineSockets.set(user.id, userSockets)

    socket.join(userRoom(user.id))
    if (firstConnection) announcePresence(user.id, true)

    socket.on('conversation:join', async (conversationId: unknown) => {
      const id = conversationIdOrNull(conversationId)
      if (!id) return
      try {
        await ConversationService.assertMembership(id, user.id)
        await socket.join(conversationRoom(id))
        socket.emit('conversation:joined', { conversationId: id })
      } catch {
        socket.emit('conversation:error', {
          conversationId: id,
          error: 'You are not a member of this conversation',
        })
      }
    })

    socket.on('conversation:leave', (conversationId: unknown) => {
      const id = conversationIdOrNull(conversationId)
      if (id) socket.leave(conversationRoom(id))
    })

    const relayTyping = async (conversationId: unknown, isTyping: boolean) => {
      const id = conversationIdOrNull(conversationId)
      if (!id) return
      try {
        await ConversationService.assertMembership(id, user.id)
      } catch {
        return
      }
      socket.to(conversationRoom(id)).emit('typing:update', {
        conversationId: id,
        userId: user.id,
        name: user.name || 'Someone',
        isTyping,
      })
    }

    socket.on('typing:start', (conversationId: unknown) => {
      void relayTyping(conversationId, true)
    })
    socket.on('typing:stop', (conversationId: unknown) => {
      void relayTyping(conversationId, false)
    })

    socket.on('presence:sync', (userIds: unknown) => {
      if (!Array.isArray(userIds)) return
      const online = userIds.filter(
        (id): id is string => typeof id === 'string' && isUserOnline(id),
      )
      socket.emit('presence:state', { online })
    })

    socket.on('disconnect', () => {
      const sockets = onlineSockets.get(user.id)
      if (!sockets) return
      sockets.delete(socket.id)
      if (sockets.size === 0) {
        onlineSockets.delete(user.id)
        announcePresence(user.id, false)
      }
    })
  })

  return io
}

export const getSocketServer = () => io

export const emitToConversation = (
  conversationId: string,
  event: string,
  payload: unknown,
) => {
  io?.to(conversationRoom(conversationId)).emit(event, payload)
}

export const emitToUser = (userId: string, event: string, payload: unknown) => {
  io?.to(userRoom(userId)).emit(event, payload)
}
