import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import jwt from 'jsonwebtoken'
import type { Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import conversationRoutes from '../routes/conversationRoutes.js'
import announcementRoutes from '../routes/announcementRoutes.js'
import ticketRoutes from '../routes/ticketRoutes.js'
import { errorHandler } from '../middleware/errorHandler.js'

let server: Server
let baseUrl: string

const tokenFor = (role: string) =>
  jwt.sign(
    { userId: `${role}-1`, id: `${role}-1`, email: `${role}@example.com`, role },
    process.env.JWT_SECRET as string,
  )

before(async () => {
  const app = express()
  app.use(express.json())
  app.use('/api/conversations', conversationRoutes)
  app.use('/api/announcements', announcementRoutes)
  app.use('/api/tickets', ticketRoutes)
  app.use(errorHandler)

  await new Promise<void>((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve)
  })
  const { port } = server.address() as AddressInfo
  baseUrl = `http://127.0.0.1:${port}`
})

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  )
})

const call = (method: string, path: string, token?: string) =>
  fetch(`${baseUrl}${path}`, {
    method,
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  })

test('communication routes require authentication', async () => {
  for (const [method, path] of [
    ['GET', '/api/conversations'],
    ['POST', '/api/conversations/owner'],
    ['GET', '/api/announcements'],
    ['GET', '/api/tickets'],
    ['POST', '/api/tickets/ticket-1/messages'],
  ]) {
    const response = await call(method, path)
    assert.equal(response.status, 401, `${method} ${path}`)
    assert.deepEqual(await response.json(), {
      success: false,
      error: 'No token provided',
    })
  }
})

test('communication routes reject malformed tokens', async () => {
  const response = await call('GET', '/api/tickets', 'definitely-not-a-jwt')
  assert.equal(response.status, 401)
  assert.deepEqual(await response.json(), {
    success: false,
    error: 'Invalid token',
  })
})

test('only staff can start conversations', async () => {
  const response = await call('POST', '/api/conversations', tokenFor('student'))
  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), {
    success: false,
    error: 'Forbidden',
  })
})

test('only staff can publish announcements', async () => {
  const response = await call(
    'POST',
    '/api/announcements',
    tokenFor('student'),
  )
  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), {
    success: false,
    error: 'Forbidden',
  })
})

test('only staff can change ticket status', async () => {
  const response = await call(
    'PATCH',
    '/api/tickets/ticket-1/status',
    tokenFor('student'),
  )
  assert.equal(response.status, 403)
  assert.deepEqual(await response.json(), {
    success: false,
    error: 'Forbidden',
  })
})
