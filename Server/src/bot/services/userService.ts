import { sequelize } from '../../config/database.js';
import User from '../../models/User.js';

interface TelegramUserData {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export async function getUserByTelegramId(telegramId: string): Promise<any> {
  try {
    const user = await User.findOne({
      where: { telegramId },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by Telegram ID:', error);
    throw error;
  }
}

export async function createTelegramUser(data: TelegramUserData): Promise<any> {
  try {
    // Combine firstName and lastName for the name field
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ') || data.username || 'Telegram User';
    
    const user = await User.create({
      telegramId: data.telegramId,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      name: fullName, // Required field
      email: `telegram_${data.telegramId}@temp.successbridge.com`, // Temporary email
      password: Math.random().toString(36).substring(7), // Random password
      role: 'student',
      isEmailVerified: true, // Auto-verify Telegram users
    });
    return user;
  } catch (error) {
    console.error('Error creating Telegram user:', error);
    throw error;
  }
}

export async function updateUserProfile(telegramId: string, updates: any): Promise<any> {
  try {
    const user = await User.findOne({ where: { telegramId } });
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(updates);
    return user;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
