import { getSubjectResources, getResourceById, getResourceDownloadUrl } from '../services/resourceService.js';
import { getUserByTelegramId } from '../services/userService.js';
import { Subject } from '../../models/index.js';
import { escapeHtml, formatDivider, getResourceIcon, formatResourceTypeTitle } from '../utils/ui.js';

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

    // Helper functions for categorization
    const isSlide = (t: string = '') => ['lecture-slide', 'lecture_slide', 'lecture-slides', 'lecture_slides', 'slide', 'slides'].includes(t.toLowerCase());
    const isNote = (t: string = '') => ['note', 'notes', 'lecture_note', 'lecture_notes', 'lecture-note', 'lecture-notes', 'handout', 'handouts', 'study_guide', 'study_guides'].includes(t.toLowerCase());
    const isExam = (t: string = '') => ['exam', 'exams', 'past_exam', 'past_exams', 'past-exam', 'past-exams', 'mid_exam', 'mid-exam', 'final_exam', 'final-exam', 'last_year_exam', 'last-year-exam', 'entrance_exam_preparation'].includes(t.toLowerCase());
    const isBook = (t: string = '') => ['book', 'books', 'textbook', 'textbooks', 'reference_book', 'reference_books', 'reference-book', 'reference-books', 'module', 'modules'].includes(t.toLowerCase());
    const isPractice = (t: string = '') => ['worksheet', 'worksheets', 'practice_question', 'practice_questions', 'practice-question', 'practice-questions', 'quiz', 'quizzes', 'assignment', 'assignments', 'solution', 'solutions'].includes(t.toLowerCase());
    const isVideo = (t: string = '') => ['video', 'videos', 'educational_video', 'educational_videos'].includes(t.toLowerCase());

    const slidesCount = resources.filter((r: any) => isSlide(r.type)).length;
    const notesCount = resources.filter((r: any) => isNote(r.type)).length;
    const examsCount = resources.filter((r: any) => isExam(r.type)).length;
    const booksCount = resources.filter((r: any) => isBook(r.type)).length;
    const practiceCount = resources.filter((r: any) => isPractice(r.type)).length;
    const videosCount = resources.filter((r: any) => isVideo(r.type)).length;

    const keyboard: any[][] = [];

    if (slidesCount > 0) {
      keyboard.push([{ text: `📊 Lecture Slides (${slidesCount})`, callback_data: `filter_${subjectId}|slides` }]);
    }
    if (notesCount > 0) {
      keyboard.push([{ text: `📝 Notes & Handouts (${notesCount})`, callback_data: `filter_${subjectId}|notes` }]);
    }
    if (examsCount > 0) {
      keyboard.push([{ text: `📋 Exams & Past Papers (${examsCount})`, callback_data: `filter_${subjectId}|exams` }]);
    }
    if (booksCount > 0) {
      keyboard.push([{ text: `📖 Textbooks & Modules (${booksCount})`, callback_data: `filter_${subjectId}|books` }]);
    }
    if (practiceCount > 0) {
      keyboard.push([{ text: `✏️ Practice & Worksheets (${practiceCount})`, callback_data: `filter_${subjectId}|practice` }]);
    }
    if (videosCount > 0) {
      keyboard.push([{ text: `🎥 Videos (${videosCount})`, callback_data: `filter_${subjectId}|videos` }]);
    }

    keyboard.push([{ text: `📁 View All Materials (${resources.length})`, callback_data: `filter_${subjectId}|all` }]);
    keyboard.push([{ text: '🔙 Back to Subject', callback_data: `course_${subjectId}` }]);

    const header = `📚 <b>${escapeHtml(subjectName)} — Study Materials</b>\n` +
      `${formatDivider()}\n` +
      `Total available materials: <b>${resources.length} files</b>\n\n` +
      `👇 <i>Select a category to browse and download:</i>`;

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
      await bot.sendMessage(
        chatId,
        `✅ <b>Delivered to your chat!</b>\n<i>Happy studying! You can find more materials below:</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
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
        `⏱️ <i>Direct high-speed link valid for 1 hour.</i>\n` +
        `${formatDivider()}`;

      await bot.sendMessage(chatId, fileCard, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📥 Click to Download File', url: downloadUrl }],
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
