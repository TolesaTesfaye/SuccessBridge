import { Resource, Subject, Grade, Stream } from '../../../models/index.js';
import { requireAdmin } from '../middleware/auth.js';
import { startResourceUpload as startUploadFlow } from '../../flows/resourceUpload.flow.js';
import { logger } from '../../middleware/logger.middleware.js';

/**
 * Show resource management menu
 */
export async function showResourceMenu(
  bot: any,
  chatId: number,
  telegramUserId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const totalResources = await Resource.count();

    const message = `
📁 *Resource Management*

Total Resources: ${totalResources}

*Actions:*
• Upload new resource
• View recent uploads
• Search resources
• Resource statistics
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📤 Upload Resource', callback_data: 'admin_resource_upload_start' }],
          [{ text: '📋 Recent Uploads', callback_data: 'admin_resource_recent' }],
          [{ text: '🔍 Search', callback_data: 'admin_resource_search' }],
          [{ text: '📊 Statistics', callback_data: 'admin_resource_stats' }],
          [{ text: '🔙 Admin Menu', callback_data: 'admin_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error showing resource menu:', error);
    await bot.sendMessage(chatId, '❌ Error loading resource menu.');
  }
}

/**
 * Start resource upload process
 */
export async function startResourceUpload(
  bot: any,
  chatId: number,
  telegramUserId: string
) {
  await requireAdmin(bot, chatId, telegramUserId);
  
  // Use the resource upload flow from flows/resourceUpload.flow.ts
  await startUploadFlow(bot, chatId, telegramUserId);
}

/**
 * View recent resource uploads
 */
export async function viewRecentResources(
  bot: any,
  chatId: number,
  telegramUserId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const resources = await Resource.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['name', 'code'],
          include: [
            { model: Grade, as: 'grade', attributes: ['name'] },
            { model: Stream, as: 'stream', attributes: ['name'] },
          ],
        },
      ],
    });

    if (resources.length === 0) {
      await bot.sendMessage(chatId, '📂 No resources found.');
      return;
    }

    const keyboard = resources.map((r: any) => [
      {
        text: `${r.title} - ${r.subject?.name || 'No Subject'}`,
        callback_data: `admin_resource_view_${r.id}`,
      },
    ]);

    keyboard.push([{ text: '🔙 Back', callback_data: 'admin_resources_menu' }]);

    await bot.sendMessage(chatId, '📋 *Recent Uploads* (Last 10)\n\nSelect to view details:', {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    console.error('Error viewing recent resources:', error);
    await bot.sendMessage(chatId, '❌ Error loading resources.');
  }
}

/**
 * View resource details
 */
export async function viewResource(
  bot: any,
  chatId: number,
  telegramUserId: string,
  resourceId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const resource: any = await Resource.findByPk(resourceId, {
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['name', 'code'],
        },
      ],
    });

    if (!resource) {
      await bot.sendMessage(chatId, '❌ Resource not found.');
      return;
    }

    const message = `
📄 *Resource Details*

*Title:* ${resource.title}
*Type:* ${resource.type}
*Subject:* ${resource.subject?.name || 'Not linked'}
*Description:* ${resource.description || 'No description'}

*Education Level:* ${resource.educationLevel}
*Grade:* ${resource.grade || 'N/A'}
*Stream:* ${resource.stream || 'N/A'}

*File:* [Download](${resource.fileUrl})
*Uploaded:* ${new Date(resource.createdAt).toLocaleString()}
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✏️ Edit', callback_data: `admin_resource_edit_${resourceId}` },
            { text: '🗑️ Delete', callback_data: `admin_resource_delete_${resourceId}` },
          ],
          [{ text: '🔙 Back', callback_data: 'admin_resource_recent' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error viewing resource:', error);
    await bot.sendMessage(chatId, '❌ Error loading resource details.');
  }
}

/**
 * Show resource statistics
 */
export async function showResourceStats(
  bot: any,
  chatId: number,
  telegramUserId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const total = await Resource.count();
    
    const byType = await Resource.findAll({
      attributes: [
        'type',
        [Resource.sequelize!.fn('COUNT', '*'), 'count'],
      ],
      group: ['type'],
      order: [[Resource.sequelize!.fn('COUNT', '*'), 'DESC']],
    });

    const bySubject = await Resource.findAll({
      attributes: [
        'subjectId',
        [Resource.sequelize!.fn('COUNT', '*'), 'count'],
      ],
      group: ['subjectId', 'subject.id', 'subject.name'], // Add grouped columns
      order: [[Resource.sequelize!.fn('COUNT', '*'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['name'], // Only select name, id will be in GROUP BY
        },
      ],
    });

    let typeStats = '*By Type:*\n';
    byType.forEach((item: any) => {
      typeStats += `• ${item.type}: ${item.dataValues.count}\n`;
    });

    let subjectStats = '\n*Top Subjects:*\n';
    bySubject.forEach((item: any) => {
      subjectStats += `• ${item.subject?.name || 'Unknown'}: ${item.dataValues.count}\n`;
    });

    const message = `
📊 *Resource Statistics*

*Total Resources:* ${total}

${typeStats}
${subjectStats}
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_resources_menu' }]],
      },
    });
  } catch (error) {
    console.error('Error showing resource stats:', error);
    await bot.sendMessage(chatId, '❌ Error loading statistics.');
  }
}
