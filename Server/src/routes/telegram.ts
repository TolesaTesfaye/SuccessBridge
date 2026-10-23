import { Router } from 'express';
import TelegramBotService from '../bot/index.js';

const router = Router();

// Webhook endpoint for Telegram bot
router.post('/webhook', async (req, res) => {
  try {
    const update = req.body;
    
    if (!update) {
      return res.status(400).json({ error: 'No update provided' });
    }

    // Process the update through the bot
    const botService = TelegramBotService.getInstance();
    await botService.processUpdate(update);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint for webhook
router.get('/webhook', (req, res) => {
  res.status(200).json({ 
    status: 'Telegram webhook endpoint is active',
    method: 'POST',
    path: '/api/telegram/webhook'
  });
});

export default router;
