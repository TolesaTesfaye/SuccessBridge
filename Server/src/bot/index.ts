import { createRequire } from 'module';
import { config } from '../config/environment.js';
import { handleStart } from './handlers/startHandler.js';
import { handleHelp } from './handlers/helpHandler.js';
import { handleBrowseCourses } from './handlers/browseCoursesHandler.js';
import { handleMyCourses } from './handlers/myCoursesHandler.js';
import { handleProfile } from './handlers/profileHandler.js';
import { handleCallbackQuery } from './handlers/callbackHandler.js';
import { handleMessage } from './handlers/messageHandler.js';
import { handleResourcesCommand } from './handlers/resourcesHandler.js';
import { handleSearchPrompt } from './handlers/searchHandler.js';
import { handleAdminCommand } from './admin/index.js';
import { handleError, withErrorHandling } from './handlers/errors/index.js';

const require = createRequire(import.meta.url);
const TelegramBot = require('node-telegram-bot-api');

class TelegramBotService {
  private bot: any;
  private static instance: TelegramBotService;

  private constructor() {
    if (!config.telegram.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }

    console.log('🔧 Creating bot instance with v0.64.0...');
    
    // Initialize bot with polling and optional proxy
    const botOptions: any = { polling: true };
    const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
    if (proxyUrl) {
      botOptions.request = { proxy: proxyUrl };
    }

    this.bot = new TelegramBot(config.telegram.botToken, botOptions);
    
    console.log('🔧 Bot instance created, setting up handlers...');
    this.setupHandlers();
    console.log('✅ Telegram Bot initialized successfully');
  }

  public static getInstance(): TelegramBotService {
    if (!TelegramBotService.instance) {
      TelegramBotService.instance = new TelegramBotService();
    }
    return TelegramBotService.instance;
  }

  private setupHandlers(): void {
    console.log('📱 Registering bot handlers...');
    
    // Wrap handlers with error handling
    const wrapHandler = (handler: any, commandName: string) => {
      return withErrorHandling(handler, (bot: any, msg: any) => ({
        chatId: msg.chat?.id,
        userId: msg.from?.id?.toString(),
        username: msg.from?.username,
        command: commandName,
      }));
    };

    // Command handlers with error handling
    this.bot.onText(/\/start/, async (msg: any) => {
      console.log('📨 Received /start from:', msg.from?.username);
      await wrapHandler(handleStart, '/start')(this.bot, msg);
    });
    
    this.bot.onText(/\/help/, async (msg: any) => {
      console.log('📨 Received /help from:', msg.from?.username);
      await wrapHandler(handleHelp, '/help')(this.bot, msg);
    });
    
    this.bot.onText(/\/browse/, async (msg: any) => {
      console.log('📨 Received /browse from:', msg.from?.username);
      await wrapHandler(handleBrowseCourses, '/browse')(this.bot, msg);
    });
    
    this.bot.onText(/\/mycourses/, async (msg: any) => {
      console.log('📨 Received /mycourses from:', msg.from?.username);
      await wrapHandler(handleMyCourses, '/mycourses')(this.bot, msg);
    });
    
    this.bot.onText(/\/profile/, async (msg: any) => {
      console.log('📨 Received /profile from:', msg.from?.username);
      await wrapHandler(handleProfile, '/profile')(this.bot, msg);
    });
    
    this.bot.onText(/\/resources/, async (msg: any) => {
      console.log('📨 Received /resources from:', msg.from?.username);
      await wrapHandler(handleResourcesCommand, '/resources')(this.bot, msg);
    });

    this.bot.onText(/\/search/, async (msg: any) => {
      console.log('📨 Received /search from:', msg.from?.username);
      await wrapHandler(async (bot: any, m: any) => {
        await handleSearchPrompt(bot, m.chat.id);
      }, '/search')(this.bot, msg);
    });

    this.bot.onText(/\/admin/, async (msg: any) => {
      console.log('📨 Received /admin from:', msg.from?.username);
      await wrapHandler(handleAdminCommand, '/admin')(this.bot, msg);
    });

    this.bot.onText(/\/getid/, async (msg: any) => {
      try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const rawUsername = msg.from.username || '';
        const firstName = msg.from.first_name || '';
        const lastName = msg.from.last_name || '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';
        
        await this.bot.sendMessage(
          chatId,
          `🆔 <b>Telegram Account Credentials:</b>\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Name:</b> ${fullName}\n` +
          `📱 <b>Username:</b> ${rawUsername ? '@' + rawUsername : 'N/A'}\n` +
          `🔢 <b>User ID:</b> <code>${userId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `💡 <i>Send this ID to an administrator for elevated access.</i>`,
          { parse_mode: 'HTML' }
        );
      } catch (error) {
        await handleError(error as Error, this.bot, {
          chatId: msg.chat?.id,
          userId: msg.from?.id?.toString(),
          command: '/getid',
        });
      }
    });

    // Callback query handler with error handling
    this.bot.on('callback_query', async (query: any) => {
      console.log('🔘 Received callback query:', query.data);
      try {
        await handleCallbackQuery(this.bot, query);
      } catch (error) {
        await handleError(error as Error, this.bot, {
          chatId: query.message?.chat?.id,
          userId: query.from?.id?.toString(),
          username: query.from?.username,
          callbackData: query.data,
        });
      }
    });

    // General message handler with error handling
    this.bot.on('message', async (msg: any) => {
      // Only handle non-command messages
      if (msg.text && !msg.text.startsWith('/')) {
        console.log('📨 Received message:', msg.text);
        try {
          await handleMessage(this.bot, msg);
        } catch (error) {
          await handleError(error as Error, this.bot, {
            chatId: msg.chat?.id,
            userId: msg.from?.id?.toString(),
            username: msg.from?.username,
          });
        }
      }
    });

    // Polling error handler - log only, never send messages via bot or trigger admin alert spam
    let lastNetworkWarn = 0;
    const NETWORK_WARN_COOLDOWN = 5 * 60 * 1000; // 5 minutes

    this.bot.on('polling_error', (error: any) => {
      const description = error?.response?.body?.description || error?.message || String(error);
      if (error?.response?.statusCode === 409 || error?.response?.body?.error_code === 409) {
        console.warn('⚠️ Telegram polling: 409 conflict during container switch (temporary)');
        return;
      }

      const isNetworkTimeout = /ETIMEDOUT|ECONNRESET|ECONNREFUSED|ENOTFOUND|EAI_AGAIN|EFATAL/i.test(description);
      if (isNetworkTimeout) {
        const now = Date.now();
        if (now - lastNetworkWarn > NETWORK_WARN_COOLDOWN) {
          lastNetworkWarn = now;
          console.warn('⚠️ Telegram Bot: Unable to reach api.telegram.org (ETIMEDOUT / connection blocked). The server continues running normally. (To disable locally, set ENABLE_TELEGRAM_BOT=false in .env)');
        }
        return;
      }

      console.error('❌ Telegram Bot polling error:', description);
    });
    
    console.log('✅ Bot handlers registered successfully with global error handling');
  }

  public getBot(): any {
    return this.bot;
  }

  public async stop(): Promise<void> {
    await this.bot.stopPolling();
    console.log('Telegram Bot stopped');
  }
}

export default TelegramBotService;
