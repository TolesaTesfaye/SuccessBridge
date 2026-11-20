import { test } from 'node:test'
import assert from 'node:assert/strict'
import { AppError } from '../middleware/errorHandler.js'
import { ConversationService } from '../services/conversationService.js'
import { TicketService } from '../services/ticketService.js'
import { AnnouncementService } from '../services/announcementService.js'

const student = { id: 'user-1', role: 'student', name: 'Student' }

const expectBadRequest = async (fn: () => Promise<unknown>, message: RegExp) => {
  await assert.rejects(fn, (error: unknown) => {
    assert.ok(error instanceof AppError, 'expected an AppError')
    assert.equal((error as AppError).statusCode, 400)
    assert.match((error as AppError).message, message)
    return true
  })
}

test('sendMessage rejects non-string content without an attachment', async () => {
  await expectBadRequest(
    () =>
      ConversationService.sendMessage(
        'conversation-1',
        'user-1',
        undefined as any,
      ),
    /content is required/i,
  )
})

test('sendMessage rejects empty or whitespace-only content', async () => {
  await expectBadRequest(
    () => ConversationService.sendMessage('conversation-1', 'user-1', '   '),
    /cannot be empty/i,
  )
})

test('sendMessage rejects content above the length limit', async () => {
  await expectBadRequest(
    () =>
      ConversationService.sendMessage(
        'conversation-1',
        'user-1',
        'a'.repeat(5001),
      ),
    /5000 characters/i,
  )
})

test('TicketService.create requires a subject and description', async () => {
  await expectBadRequest(
    () => TicketService.create(student, { subject: '   ', description: 'x' }),
    /subject is required/i,
  )
  await expectBadRequest(
    () => TicketService.create(student, { subject: 'Help', description: '' }),
    /description is required/i,
  )
})

test('TicketService.addMessage rejects blank replies', async () => {
  await expectBadRequest(
    () => TicketService.addMessage('ticket-1', student, '  '),
    /cannot be empty/i,
  )
})

test('TicketService.updateStatus rejects unknown statuses', async () => {
  await expectBadRequest(
    () => TicketService.updateStatus('ticket-1', 'archived', student),
    /invalid ticket status/i,
  )
})

test('AnnouncementService.create requires a title and content', async () => {
  await expectBadRequest(
    () => AnnouncementService.create('admin-1', { content: 'Body' }),
    /title is required/i,
  )
  await expectBadRequest(
    () => AnnouncementService.create('admin-1', { title: 'Notice' }),
    /content is required/i,
  )
})
