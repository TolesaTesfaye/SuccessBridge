import { getSubjectResources, getResourceById, getResourceDownloadUrl } from '../services/resourceService.js';
import { getUserByTelegramId } from '../services/userService.js';
import { Subject, SubjectAccess, User } from '../../models/index.js';
import { escapeHtml, formatDivider, getResourceIcon, formatResourceTypeTitle, getWebUrl } from '../utils/ui.js';
import { 
  checkDownloadAccess, 
  trackDownload, 
  getUserDownloadStats,
  getProgressBar,
  getUpgradeMessage,
  shouldShowUpgradePrompt
} from '../../services/downloadTracker.js';

/**
 * Handle /resources command - show subjects with resources
 */
export async function handleResourcesCommand(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from.id.toString();

  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(
        chatId,
        '❌ <i>User not found. Please use /start to register first.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    const message = `📚 <b>Academic Study Resources</b>\n` +
      `${formatDivider()}\n` +
      `Access verified learning materials for your enrolled subjects:\n\n` +
      `1️⃣ Open <b>My Subjects</b> to view enrolled subjects\n` +
      `2️⃣ Select any subject to explore lecture slides, notes, & past exams\n` +
      `3️⃣ Download or receive documents directly in Telegram\n\n` +
      `🔍 <i>Tip: You can also search anything by sending a keyword in this chat!</i>\n` +
      `${formatDivider()}`;

    await bot.sendMessage(
      chatId,
      message,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📖 My Subjects', callback_data: 'mycourses' }],
            [{ text: '📚 Browse All Levels', callback_data: 'browse_courses' }],
            [{ text: '🔍 Search Materials', callback_data: 'search_prompt' }],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error in handleResourcesCommand:', error);
    await bot.sendMessage(chatId, '❌ <i>An error occurred. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

export async function handleViewResources(bot: any, chatId: number, subjectId: string, telegramUserId: string): Promise<void> {
  try {
    console.log(`📥 Fetching resources for subject: ${subjectId}`);
    
    // Get user and check access
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ <i>User not found. Please use /start to register first.</i>', { parse_mode: 'HTML' });
      return;
    }

    // Check download access with new tracker service
    const downloadStats = await checkDownloadAccess(user.id);
    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
    
    // Check if user has subject-specific access
    const hasSubjectAccess = await SubjectAccess.findOne({
      where: {
        userId: user.id,
        subjectId: subjectId
      }
    });

    // Non-admin users without subject access and exhausted free tier see paywall
    if (!isAdmin && !hasSubjectAccess && !downloadStats.canDownload) {
      await bot.sendMessage(
        chatId,
        `🔒 <b>Free Limit Reached — Premium Required</b>\n` +
        `${formatDivider()}\n` +
        `You have used your <b>${downloadStats.downloadsUsed}/${downloadStats.downloadLimit} free downloads</b>.\n` +
        `To continue accessing study materials, please unlock premium access.\n\n` +
        `💳 <b>One payment unlocks ALL subjects!</b>\n` +
        `• Pay once (200 Birr)\n` +
        `• Unlimited downloads directly in Telegram\n` +
        `• Full access on web platform\n` +
        `• Instant approval by Super Admin\n\n` +
        `${formatDivider()}\n` +
        `🗣️ <b>Afaan Oromoo:</b>\n` +
        `<i>Faayilii ${downloadStats.downloadsUsed} bilisaan fayyadamteerta. Itti fufuuf Qarshii 200 kaffaluun gosa barnoota hunda guutummaatti argadhu!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💳 Pay Now via Bot (200 Birr)', callback_data: 'ready_to_pay' }],
              [{ text: '📱 Contact @Tol_man27', url: 'https://t.me/Tol_man27' }],
              [{ text: '🔙 Back to Subject', callback_data: `course_${subjectId}` }],
            ],
          },
        }
      );
      return;
    }

    const [resources, subject] = await Promise.all([
      getSubjectResources(subjectId),
      Subject.findByPk(subjectId),
    ]);

    const subjectName = subject?.name || 'Subject';

    if (!resources || resources.length === 0) {
      console.log('⚠️ No resources, sending empty message');
      await bot.sendMessage(
        chatId,
        `📂 <b>${escapeHtml(subjectName)}</b>\n${formatDivider()}\n<i>No study materials have been uploaded for this subject yet. Check back soon!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ text: '🔙 Back to Subject', callback_data: `course_${subjectId}` }]],
          },
        }
      );
      return;
    }

    // Show all resources directly as downloadable buttons
    // Limit to first 20 resources to avoid keyboard size limits
    const displayLimit = 20;
    const resourcesToShow = resources.slice(0, displayLimit);
    
    const keyboard: any[][] = resourcesToShow.map((resource: any) => {
      // Show lock icon for free users approaching limit
      const lockIcon = !downloadStats.hasPremium && downloadStats.downloadsRemaining === 0 ? '🔒 ' : '';
      return [
        {
          text: `${lockIcon}${getResourceIcon(resource.type)} ${resource.title.substring(0, 40)}`,
          callback_data: `download_${resource.id}`,
        },
      ];
    });

    // If there are more resources, add "Show More" option
    if (resources.length > displayLimit) {
      keyboard.push([
        { text: `📂 Show All ${resources.length} Materials`, callback_data: `filter_${subjectId}|all` }
      ]);
    }

    keyboard.push([{ text: '🌐 Read & Practice on Website', url: getWebUrl() }]);
    keyboard.push([{ text: '🔙 Back to Subject', callback_data: `course_${subjectId}` }]);

    // Build header with download stats for free users
    let statsLine = '';
    if (!downloadStats.hasPremium && !isAdmin && !hasSubjectAccess) {
      const progressBar = getProgressBar(downloadStats.downloadsUsed, downloadStats.downloadLimit);
      statsLine = `\n📊 <b>Free Downloads:</b> ${downloadStats.downloadsUsed}/${downloadStats.downloadLimit} ${progressBar}\n` +
                  `${downloadStats.downloadsRemaining > 0 ? `💡 ${downloadStats.downloadsRemaining} free downloads remaining` : '🔒 Upgrade to premium for unlimited access'}\n`;
    }

    const header = `📚 <b>${escapeHtml(subjectName)} — Study Materials</b>\n` +
      `${formatDivider()}\n` +
      `Total available materials: <b>${resources.length} files</b>${statsLine}\n` +
      `👇 <i>Select any file to download directly to your chat:</i>`;

    await bot.sendMessage(
      chatId,
      header,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  } catch (error) {
    console.error('❌ Error in handleViewResources:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading resource types. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

export async function handleDownloadResource(bot: any, chatId: number, resourceId: string, telegramUserId: string): Promise<void> {
  // Send "processing" indicator
  const processingMsg = await bot.sendMessage(chatId, '⏳ <i>Preparing your study material...</i>', { parse_mode: 'HTML' });

  try {
    const resource = await getResourceById(resourceId);

    if (!resource) {
      await bot.editMessageText('❌ <i>Resource not found.</i>', {
        chat_id: chatId,
        message_id: processingMsg.message_id,
        parse_mode: 'HTML',
      });
      return;
    }

    // Check access before allowing download
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.editMessageText('❌ <i>User not found. Please use /start to register first.</i>', {
        chat_id: chatId,
        message_id: processingMsg.message_id,
        parse_mode: 'HTML',
      });
      return;
    }

    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
    
    // Check if user has premium access (paid) for this subject
    const hasPremiumAccess = resource.subjectId ? await SubjectAccess.findOne({
      where: {
        userId: user.id,
        subjectId: resource.subjectId
      }
    }) : null;

    // Check download access with tracker service
    const downloadStats = await checkDownloadAccess(user.id);

    // Non-admin users without premium access are subject to download limit
    if (!isAdmin && !hasPremiumAccess && !downloadStats.canDownload) {
      // Delete processing message
      try {
        await bot.deleteMessage(chatId, processingMsg.message_id);
      } catch (_) {}

      // User has reached the free download limit
      const progressBar = getProgressBar(downloadStats.downloadsUsed, downloadStats.downloadLimit);
      
      await bot.sendMessage(
        chatId,
        `🚫 <b>Free Download Limit Reached</b>\n\n` +
        `📊 Downloads: ${downloadStats.downloadsUsed}/${downloadStats.downloadLimit} ${progressBar}\n\n` +
        `💳 <b>Unlock Unlimited Downloads:</b>\n` +
        `• Pay once (200 Birr)\n` +
        `• Download unlimited resources\n` +
        `• Access ALL subjects\n` +
        `• Instant approval (10-30 minutes)\n\n` +
        `${formatDivider()}\n` +
        `🗣️ <b>Afaan Oromoo:</b>\n` +
        `<i>Faayilii ${downloadStats.downloadsUsed} bilisaan download goote. Itti fufuuf Qarshii 200 kaffali. Sanaa booda faayilii hunda bilisaan argatta!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💳 Pay Now - Unlock All', callback_data: 'ready_to_pay' }],
              [{ text: '📱 Contact @Tol_man27', url: 'https://t.me/Tol_man27' }],
              [{ text: '🔙 Back to Materials', callback_data: `resources_${resource.subjectId || ''}` }],
            ],
          },
        }
      );
      return;
    }

    // Get download URL
    const downloadUrl = await getResourceDownloadUrl(resource.fileUrl);

    // Delete processing message
    try {
      await bot.deleteMessage(chatId, processingMsg.message_id);
    } catch (_) {}

    const icon = getResourceIcon(resource.type);
    const categoryName = formatResourceType(resource.type);

    // Try direct document delivery to Telegram chat
    let directDeliverySuccessful = false;
    try {
      const caption = `${icon} <b>${escapeHtml(resource.title)}</b>\n` +
        `📂 Category: <b>${escapeHtml(categoryName)}</b>\n` +
        `${resource.subject ? `📚 Subject: <b>${escapeHtml(resource.subject.name)}</b>\n` : ''}` +
        `${formatDivider()}\n` +
        `🎓 <i>SuccessBridge Learning Hub</i>`;

      await bot.sendDocument(chatId, downloadUrl, {
        caption,
        parse_mode: 'HTML',
      });
      directDeliverySuccessful = true;
    } catch (sendDocError: any) {
      console.log('Direct document delivery failed (falling back to download card):', sendDocError?.message || sendDocError);
    }

    if (directDeliverySuccessful) {
      // Track the download using the new service
      if (!isAdmin && !hasPremiumAccess) {
        try {
          await trackDownload(
            user.id,
            resource.id,
            resource.title,
            resource.type,
            resource.subject?.name
          );

          // Get updated stats after tracking
          const updatedStats = await getUserDownloadStats(user.id);
          
          // Show warning if user should be prompted to upgrade
          if (shouldShowUpgradePrompt(updatedStats)) {
            const upgradeMsg = getUpgradeMessage(updatedStats.downloadsUsed, updatedStats.downloadsRemaining);
            const progressBar = getProgressBar(updatedStats.downloadsUsed, updatedStats.downloadLimit);
            
            await bot.sendMessage(
              chatId,
              upgradeMsg + `\n\n📊 ${updatedStats.downloadsUsed}/${updatedStats.downloadLimit} ${progressBar}`,
              {
                parse_mode: 'HTML',
                reply_markup: {
                  inline_keyboard: [
                    [{ text: '💳 Unlock Unlimited Access', callback_data: 'ready_to_pay' }],
                  ],
                },
              }
            );
          }
        } catch (trackError) {
          console.error('Error tracking download:', trackError);
          // Continue even if tracking fails
        }
      }

      await bot.sendMessage(
        chatId,
        `✅ <b>Delivered to your chat!</b>\n` +
        `${formatDivider()}\n` +
        `💡 <b>Pro Tip:</b> Want to read this online in full HD, bookmark pages, and take chapter quizzes?\n` +
        `<i>Enjoy interactive reading on our web platform!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🌐 Read & Practice on Website', url: getWebUrl() }],
              [{ text: '🔙 Back to Materials', callback_data: `resources_${resource.subjectId || ''}` }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
    } else {
      // Fallback: Send sleek download card with direct link
      const fileCard = `📄 <b>${escapeHtml(resource.title)}</b>\n` +
        `${formatDivider()}\n` +
        `${icon} <b>Category:</b> ${escapeHtml(categoryName)}\n` +
        `${resource.subject ? `📚 <b>Subject:</b> ${escapeHtml(resource.subject.name)}\n` : ''}` +
        `${resource.description ? `📝 <b>Description:</b> ${escapeHtml(resource.description)}\n` : ''}` +
        `⏱️ <i>Direct high-speed link valid for 1 hour.</i>\n\n` +
        `💡 <i>You can also read this online in full screen on our website!</i>\n` +
        `${formatDivider()}`;

      await bot.sendMessage(chatId, fileCard, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📥 Click to Download File', url: downloadUrl }],
            [{ text: '🌐 Website Preview', callback_data: 'open_website' }],
            [{ text: '🔙 Back to Materials', callback_data: `resources_${resource.subjectId || ''}` }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
          ],
        },
      });
    }
  } catch (error) {
    console.error('Error in handleDownloadResource:', error);
    try {
      await bot.deleteMessage(chatId, processingMsg.message_id);
    } catch (_) {}
    await bot.sendMessage(chatId, '❌ <i>Error downloading resource. Please try again later.</i>', { parse_mode: 'HTML' });
  }
}

export async function handleFilterResources(
  bot: any,
  chatId: number,
  subjectId: string,
  type: string,
  telegramUserId: string
): Promise<void> {
  try {
    const [allResources, subject] = await Promise.all([
      getSubjectResources(subjectId),
      Subject.findByPk(subjectId),
    ]);

    const subjectName = subject?.name || 'Subject';
    let filteredResources: any[] = [];
    let displayName = '';
    let categoryIcon = '📚';

    const normalizedType = type.toLowerCase();

    if (normalizedType === 'all') {
      filteredResources = allResources;
      displayName = 'All Materials';
      categoryIcon = '📁';
    } else if (normalizedType === 'exam' || normalizedType === 'exams') {
      const examTypes = ['exam', 'exams', 'past_exam', 'past_exams', 'past-exam', 'past-exams', 'mid_exam', 'mid-exam', 'final_exam', 'final-exam', 'last_year_exam', 'last-year-exam', 'entrance_exam_preparation'];
      filteredResources = allResources.filter((r: any) => examTypes.includes(r.type?.toLowerCase()));
      displayName = 'Exams & Past Papers';
      categoryIcon = '📋';
    } else if (normalizedType === 'lecture-slide' || normalizedType === 'slide' || normalizedType === 'slides') {
      const slideTypes = ['lecture-slide', 'lecture_slide', 'lecture-slides', 'lecture_slides', 'slide', 'slides'];
      filteredResources = allResources.filter((r: any) => slideTypes.includes(r.type?.toLowerCase()));
      displayName = 'Lecture Slides';
      categoryIcon = '📊';
    } else if (normalizedType === 'note' || normalizedType === 'notes') {
      const noteTypes = ['note', 'notes', 'lecture_note', 'lecture_notes', 'lecture-note', 'lecture-notes', 'handout', 'handouts', 'study_guide', 'study_guides'];
      filteredResources = allResources.filter((r: any) => noteTypes.includes(r.type?.toLowerCase()));
      displayName = 'Notes & Handouts';
      categoryIcon = '📝';
    } else if (normalizedType === 'book' || normalizedType === 'books') {
      const bookTypes = ['book', 'books', 'textbook', 'textbooks', 'reference_book', 'reference_books', 'reference-book', 'reference-books', 'module', 'modules'];
      filteredResources = allResources.filter((r: any) => bookTypes.includes(r.type?.toLowerCase()));
      displayName = 'Textbooks & Modules';
      categoryIcon = '📖';
    } else if (normalizedType === 'practice' || normalizedType === 'worksheet' || normalizedType === 'worksheets') {
      const practiceTypes = ['worksheet', 'worksheets', 'practice_question', 'practice_questions', 'practice-question', 'practice-questions', 'quiz', 'quizzes', 'assignment', 'assignments', 'solution', 'solutions'];
      filteredResources = allResources.filter((r: any) => practiceTypes.includes(r.type?.toLowerCase()));
      displayName = 'Practice & Worksheets';
      categoryIcon = '✏️';
    } else if (normalizedType === 'video' || normalizedType === 'videos') {
      const videoTypes = ['video', 'videos', 'educational_video', 'educational_videos'];
      filteredResources = allResources.filter((r: any) => videoTypes.includes(r.type?.toLowerCase()));
      displayName = 'Videos';
      categoryIcon = '🎥';
    } else {
      filteredResources = allResources.filter((r: any) => r.type?.toLowerCase() === normalizedType || r.type?.toLowerCase().includes(normalizedType));
      displayName = formatResourceType(type);
    }

    if (!filteredResources || filteredResources.length === 0) {
      await bot.sendMessage(
        chatId,
        `📂 <b>${escapeHtml(subjectName)}</b>\n${formatDivider()}\n<i>No ${escapeHtml(displayName)} found for this subject yet.</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ text: '🔙 Back to Resource Types', callback_data: `resources_${subjectId}` }]],
          },
        }
      );
      return;
    }

    const keyboard: any[][] = filteredResources.slice(0, 25).map((resource: any) => [
      {
        text: `${getResourceIcon(resource.type)} ${resource.title.substring(0, 36)}`,
        callback_data: `download_${resource.id}`,
      },
    ]);

    keyboard.push([
      { text: '🌐 Read All Online on Website', url: getWebUrl() },
    ]);
    keyboard.push([
      { text: '🔙 Back to Categories', callback_data: `resources_${subjectId}` },
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ]);

    const header = `${categoryIcon} <b>${escapeHtml(subjectName)} — ${escapeHtml(displayName)}</b> (${filteredResources.length})\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select a file to receive or download:</i>`;

    await bot.sendMessage(
      chatId,
      header,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  } catch (error) {
    console.error('Error in handleFilterResources:', error);
    await bot.sendMessage(chatId, '❌ <i>Error filtering resources. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

function formatResourceType(type: string): string {
  const names: Record<string, string> = {
    'lecture-slide': 'Lecture Slides',
    'lecture_slide': 'Lecture Slides',
    'lecture_slides': 'Lecture Slides',
    'handout': 'Handouts',
    'handouts': 'Handouts',
    'note': 'Notes',
    'notes': 'Notes',
    'lecture_note': 'Lecture Notes',
    'lecture_notes': 'Lecture Notes',
    'module': 'Modules',
    'modules': 'Modules',
    'reference-book': 'Reference Books',
    'reference_book': 'Reference Books',
    'reference_books': 'Reference Books',
    'textbook': 'Textbooks',
    'textbooks': 'Textbooks',
    'mid-exam': 'Mid Exams',
    'mid_exam': 'Mid Exams',
    'final-exam': 'Final Exams',
    'final_exam': 'Final Exams',
    'last-year-exam': 'Past Papers',
    'last_year_exam': 'Past Papers',
    'past_exam': 'Past Exams',
    'past_exams': 'Past Exams',
    'exam': 'Exams',
    'exams': 'Exams',
    'assignment': 'Assignments',
    'assignments': 'Assignments',
    'practice_question': 'Practice Questions',
    'practice_questions': 'Practice Questions',
    'worksheet': 'Worksheets',
    'worksheets': 'Worksheets',
    'solution': 'Solutions',
    'solutions': 'Solutions',
  };
  return names[type?.toLowerCase()] || formatResourceTypeTitle(type);
}
