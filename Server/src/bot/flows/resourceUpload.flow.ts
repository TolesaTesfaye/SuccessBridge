/**
 * Resource Upload Flow
 * Multi-step flow for admins to upload resources via Telegram
 */

import { stateManager, isCancelCommand } from '../state/stateManager.js';
import { requireAdmin } from '../admin/middleware/auth.js';
import { validateFile, validateResourceType, validateUUID } from '../middleware/validation.middleware.js';
import { logger } from '../middleware/logger.middleware.js';
import { Subject } from '../../models/index.js';
import { Op } from 'sequelize';

/**
 * Steps in resource upload flow
 */
export enum UploadStep {
  AWAITING_FILE = 1,
  AWAITING_SUBJECT = 2,
  AWAITING_TYPE = 3,
  AWAITING_TITLE = 4,
  CONFIRMING = 5,
}

/**
 * Resource upload data
 */
interface UploadData {
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  subjectId?: string;
  subjectName?: string;
  resourceType?: string;
  title?: string;
}

/**
 * Start resource upload flow
 */
export async function startResourceUpload(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  // Check admin permission
  await requireAdmin(bot, chatId, telegramUserId);

  // Start flow
  stateManager.startFlow(telegramUserId, 'resource_upload');

  await bot.sendMessage(
    chatId,
    '📤 *Resource Upload*\n\n' +
    'Step 1/4: Upload a file\n\n' +
    'Please send the document, PDF, PowerPoint, or image you want to upload.\n\n' +
    '💡 Supported formats: PDF, PowerPoint, Word, Images\n' +
    '📏 Max size: 50MB\n\n' +
    'Type /cancel to abort.',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '❌ Cancel', callback_data: 'admin_upload_cancel' }],
        ],
      },
    }
  );
}

/**
 * Handle file upload (Step 1)
 */
export async function handleFileUpload(bot: any, msg: any): Promise<void> {
  const userId = msg.from.id.toString();
  const chatId = msg.chat.id;

  const state = stateManager.getState(userId, 'resource_upload');
  
  if (!state || state.step !== UploadStep.AWAITING_FILE) {
    return; // Not in upload flow or wrong step
  }

  try {
    // Check for cancel command
    if (msg.text && isCancelCommand(msg.text)) {
      return await cancelUpload(bot, chatId, userId);
    }

    // Validate file
    if (!msg.document && !msg.photo) {
      await bot.sendMessage(
        chatId,
        '⚠️ Please send a document or image file.\n\nType /cancel to abort.'
      );
      return;
    }

    // Handle document
    if (msg.document) {
      validateFile(msg.document);

      const data: UploadData = {
        fileId: msg.document.file_id,
        fileName: msg.document.file_name,
        fileSize: msg.document.file_size,
        mimeType: msg.document.mime_type,
      };

      logger.logFileUpload(data.fileName!, data.fileSize!, userId, data.mimeType);

      // Update state and move to next step
      stateManager.nextStep(userId, 'resource_upload', data);

      // Ask for subject
      await askForSubject(bot, chatId, userId);
    }
    // Handle photo
    else if (msg.photo) {
      const photo = msg.photo[msg.photo.length - 1]; // Largest size

      const data: UploadData = {
        fileId: photo.file_id,
        fileName: `photo_${Date.now()}.jpg`,
        fileSize: photo.file_size,
        mimeType: 'image/jpeg',
      };

      logger.logFileUpload(data.fileName!, data.fileSize!, userId, data.mimeType);

      stateManager.nextStep(userId, 'resource_upload', data);
      await askForSubject(bot, chatId, userId);
    }
  } catch (error) {
    // Error handled by global error handler
    await cancelUpload(bot, chatId, userId);
    throw error;
  }
}

/**
 * Ask for subject selection (Step 2)
 */
async function askForSubject(bot: any, chatId: number, userId: string): Promise<void> {
  // Get recent subjects
  const subjects = await Subject.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'name', 'code'],
  });

  if (subjects.length === 0) {
    await bot.sendMessage(chatId, '❌ No subjects found. Please create subjects first.');
    await cancelUpload(bot, chatId, userId);
    return;
  }

  const keyboard = subjects.map(s => [
    {
      text: `${s.name} (${s.code})`,
      callback_data: `upload_subject_${s.id}`,
    },
  ]);

  keyboard.push([
    { text: '🔍 Search Other Subject', callback_data: 'upload_search_subject' },
    { text: '❌ Cancel', callback_data: 'admin_upload_cancel' },
  ]);

  await bot.sendMessage(
    chatId,
    '📚 *Step 2/4: Select Subject*\n\n' +
    'Which subject is this resource for?\n\n' +
    'Select from recent subjects or search for another:',
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard },
    }
  );
}

/**
 * Handle subject selection (Step 2)
 */
export async function handleSubjectSelection(
  bot: any,
  query: any,
  subjectId: string
): Promise<void> {
  const userId = query.from.id.toString();
  const chatId = query.message.chat.id;

  const state = stateManager.getState(userId, 'resource_upload');
  
  if (!state || state.step !== UploadStep.AWAITING_SUBJECT) {
    return;
  }

  try {
    // Validate subject ID
    const validSubjectId = validateUUID(subjectId, 'Subject ID');

    // Get subject details
    const subject = await Subject.findByPk(validSubjectId);

    if (!subject) {
      await bot.sendMessage(chatId, '❌ Subject not found. Please select again.');
      return;
    }

    // Update state
    stateManager.nextStep(userId, 'resource_upload', {
      subjectId: subject.id,
      subjectName: subject.name,
    });

    // Ask for resource type
    await askForResourceType(bot, chatId);
  } catch (error) {
    await cancelUpload(bot, chatId, userId);
    throw error;
  }
}

/**
 * Ask for resource type (Step 3)
 */
async function askForResourceType(bot: any, chatId: number): Promise<void> {
  const typeButtons = [
    [
      { text: '📊 Lecture Slide', callback_data: 'upload_type_lecture-slide' },
      { text: '📄 Handout', callback_data: 'upload_type_handout' },
    ],
    [
      { text: '📝 Note', callback_data: 'upload_type_note' },
      { text: '📚 Module', callback_data: 'upload_type_module' },
    ],
    [
      { text: '📖 Reference Book', callback_data: 'upload_type_reference-book' },
    ],
    [
      { text: '📝 Mid Exam', callback_data: 'upload_type_mid-exam' },
      { text: '📝 Final Exam', callback_data: 'upload_type_final-exam' },
    ],
    [
      { text: '📋 Last Year Exam', callback_data: 'upload_type_last-year-exam' },
    ],
    [
      { text: '⬅️ Back', callback_data: 'upload_back' },
      { text: '❌ Cancel', callback_data: 'admin_upload_cancel' },
    ],
  ];

  await bot.sendMessage(
    chatId,
    '📂 *Step 3/4: Select Resource Type*\n\n' +
    'What type of resource is this?',
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: typeButtons },
    }
  );
}

/**
 * Handle resource type selection (Step 3)
 */
export async function handleTypeSelection(
  bot: any,
  query: any,
  type: string
): Promise<void> {
  const userId = query.from.id.toString();
  const chatId = query.message.chat.id;

  const state = stateManager.getState(userId, 'resource_upload');
  
  if (!state || state.step !== UploadStep.AWAITING_TYPE) {
    return;
  }

  try {
    // Validate type
    const validType = validateResourceType(type);

    // Update state
    stateManager.nextStep(userId, 'resource_upload', {
      resourceType: validType,
    });

    // Ask for title
    await bot.sendMessage(
      chatId,
      '✏️ *Step 4/4: Enter Title*\n\n' +
      'Please enter a title for this resource.\n\n' +
      'Example: "Chapter 5 - Thermodynamics"\n\n' +
      'Type /cancel to abort.',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '❌ Cancel', callback_data: 'admin_upload_cancel' }],
          ],
        },
      }
    );
  } catch (error) {
    await cancelUpload(bot, chatId, userId);
    throw error;
  }
}

/**
 * Handle title input (Step 4)
 */
export async function handleTitleInput(bot: any, msg: any): Promise<void> {
  const userId = msg.from.id.toString();
  const chatId = msg.chat.id;

  const state = stateManager.getState(userId, 'resource_upload');
  
  if (!state || state.step !== UploadStep.AWAITING_TITLE) {
    return;
  }

  try {
    // Check for cancel
    if (isCancelCommand(msg.text)) {
      return await cancelUpload(bot, chatId, userId);
    }

    if (!msg.text || msg.text.trim().length === 0) {
      await bot.sendMessage(chatId, '⚠️ Please enter a valid title.\n\nType /cancel to abort.');
      return;
    }

    const title = msg.text.trim();

    if (title.length > 200) {
      await bot.sendMessage(
        chatId,
        '⚠️ Title too long (max 200 characters).\n\nPlease enter a shorter title:'
      );
      return;
    }

    // Update state
    stateManager.nextStep(userId, 'resource_upload', { title });

    // Show confirmation
    await showConfirmation(bot, chatId, userId);
  } catch (error) {
    await cancelUpload(bot, chatId, userId);
    throw error;
  }
}

/**
 * Show upload confirmation (Step 5)
 */
async function showConfirmation(bot: any, chatId: number, userId: string): Promise<void> {
  const state = stateManager.getState(userId, 'resource_upload');

  if (!state) return;

  const data = state.data as UploadData;

  const message = `
📋 *Confirm Upload*

📁 *File:* ${data.fileName}
📏 *Size:* ${(data.fileSize! / 1024).toFixed(2)} KB
📚 *Subject:* ${data.subjectName}
📂 *Type:* ${data.resourceType}
✏️ *Title:* ${data.title}

Is this correct?
  `.trim();

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Confirm & Upload', callback_data: 'upload_confirm' },
          { text: '❌ Cancel', callback_data: 'admin_upload_cancel' },
        ],
      ],
    },
  });
}

/**
 * Confirm and process upload (Step 5)
 */
export async function confirmUpload(bot: any, query: any): Promise<void> {
  const userId = query.from.id.toString();
  const chatId = query.message.chat.id;

  const state = stateManager.getState(userId, 'resource_upload');

  if (!state || state.step !== UploadStep.CONFIRMING) {
    return;
  }

  try {
    const data = state.data as UploadData;

    // TODO: Implement actual B2 upload and database creation
    // For now, just simulate success
    
    await bot.sendMessage(
      chatId,
      '✅ *Resource Upload Successful!*\n\n' +
      `📁 File: ${data.fileName}\n` +
      `📚 Subject: ${data.subjectName}\n` +
      `📂 Type: ${data.resourceType}\n` +
      `✏️ Title: ${data.title}\n\n` +
      '⚠️ Note: Actual B2 upload not yet implemented.',
      { parse_mode: 'Markdown' }
    );

    logger.logAdminAction('resource_upload_success', userId, data.subjectId, {
      fileName: data.fileName,
      type: data.resourceType,
      title: data.title,
    });

    // Complete flow
    stateManager.completeFlow(userId, 'resource_upload');

    // Return to admin menu
    await bot.sendMessage(chatId, 'Returning to admin menu...', {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Admin Menu', callback_data: 'admin_menu' }]],
      },
    });
  } catch (error) {
    await cancelUpload(bot, chatId, userId);
    throw error;
  }
}

/**
 * Cancel upload flow
 */
export async function cancelUpload(bot: any, chatId: number, userId: string): Promise<void> {
  const cancelled = stateManager.cancelFlow(userId, 'resource_upload');

  if (cancelled) {
    await bot.sendMessage(
      chatId,
      '❌ Upload cancelled.',
      {
        reply_markup: {
          inline_keyboard: [[{ text: '🔙 Admin Menu', callback_data: 'admin_menu' }]],
        },
      }
    );
  }
}

/**
 * Go back one step
 */
export async function goBackStep(bot: any, query: any): Promise<void> {
  const userId = query.from.id.toString();
  const chatId = query.message.chat.id;

  const state = stateManager.previousStep(userId, 'resource_upload');

  if (!state) {
    return;
  }

  // Re-render current step
  switch (state.step) {
    case UploadStep.AWAITING_FILE:
      await startResourceUpload(bot, chatId, userId);
      break;
    case UploadStep.AWAITING_SUBJECT:
      await askForSubject(bot, chatId, userId);
      break;
    case UploadStep.AWAITING_TYPE:
      await askForResourceType(bot, chatId);
      break;
    case UploadStep.AWAITING_TITLE:
      await bot.sendMessage(chatId, 'Please enter the resource title:');
      break;
  }
}
