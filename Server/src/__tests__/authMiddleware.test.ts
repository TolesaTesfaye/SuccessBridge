import { test } from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import type { NextFunction, Request } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'

const createRes = () => {
  const res: any = { statusCode: 200, body: undefined as any }
  res.status = (code: number) => {
    res.statusCode = code
    return res
  }
  res.json = (payload: unknown) => {
    res.body = payload
    return res
  }
  return res
}

const runAuth = async (req: any) => {
  const res = createRes()
  let nextCalls = 0
  await authMiddleware(req, res, (() => {
    nextCalls += 1
  }) as NextFunction)
  return { res, nextCalls }
}

test('authMiddleware rejects a request without a token', async () => {
  const req = { headers: {} } as Request
  const { res, nextCalls } = await runAuth(req)

  assert.equal(nextCalls, 0)
  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { success: false, error: 'No token provided' })
})

test('authMiddleware rejects an invalid token', async () => {
  const req = { headers: { authorization: 'Bearer not-a-real-token' } } as Request
  const { res, nextCalls } = await runAuth(req)

  assert.equal(nextCalls, 0)
  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { success: false, error: 'Invalid token' })
})

test('authMiddleware accepts a valid token and maps userId to id', async () => {
  const token = jwt.sign(
    { userId: 'user-1', id: 'user-1', email: 'student@example.com', role: 'student' },
    process.env.JWT_SECRET as string,
  )
  const req = { headers: { authorization: `Bearer ${token}` } } as Request
  const { res, nextCalls } = await runAuth(req)

  assert.equal(res.statusCode, 200)
  assert.equal(nextCalls, 1)
  assert.equal((req as any).user.id, 'user-1')
  assert.equal((req as any).user.userId, 'user-1')
  assert.equal((req as any).user.role, 'student')
})

test('requireRole returns 401 when no user is attached', () => {
  const req = {} as Request
  const res = createRes()
  let nextCalls = 0

  requireRole('admin')(
    req,
    res,
    (() => {
      nextCalls += 1
    }) as NextFunction,
  )

  assert.equal(nextCalls, 0)
  assert.equal(res.statusCode, 401)
  assert.deepEqual(res.body, { success: false, error: 'Unauthorized' })
})

test('requireRole returns 403 when the role is not allowed', () => {
  const req = { user: { role: 'student' } } as any
  const res = createRes()
  let nextCalls = 0

  requireRole('admin', 'super_admin')(
    req,
    res,
    (() => {
      nextCalls += 1
    }) as NextFunction,
  )

  assert.equal(nextCalls, 0)
  assert.equal(res.statusCode, 403)
  assert.deepEqual(res.body, { success: false, error: 'Forbidden' })
})

test('requireRole calls next for an allowed role', () => {
  const req = { user: { role: 'admin' } } as any
  const res = createRes()
  let nextCalls = 0

  requireRole('admin', 'super_admin')(
    req,
    res,
    (() => {
      nextCalls += 1
    }) as NextFunction,
  )

  assert.equal(nextCalls, 1)
  assert.equal(res.statusCode, 200)
})
