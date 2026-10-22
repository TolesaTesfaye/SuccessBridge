import { sequelize } from '../../config/database.js';
import User from '../../models/User.js';

interface TelegramUserData {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

import { Op } from 'sequelize';

export async function getUserByTelegramId(telegramId: string): Promise<any> {
  try {
    // 1. Try to find by telegramId
    let user = await User.findOne({
      where: { telegramId },
    });

    // 2. Fallback: check if legacy user was created by email before telegramId column was linked
    if (!user) {
      const tempEmail = `telegram_${telegramId}@temp.successbridge.com`;
      user = await User.findOne({
        where: { email: tempEmail },
      });
      if (user) {
        user.telegramId = telegramId;
        await user.save();
      }
    }

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
    const tempEmail = `telegram_${data.telegramId}@temp.successbridge.com`;

    // Check if an existing account with this temporary email or telegramId already exists
    const existing = await User.findOne({
      where: {
        [Op.or]: [
          { telegramId: data.telegramId },
          { email: tempEmail },
        ],
      },
    });

    if (existing) {
      existing.telegramId = data.telegramId;
      if (data.username && !existing.username) existing.username = data.username;
      if (data.firstName && !existing.firstName) existing.firstName = data.firstName;
      if (data.lastName && !existing.lastName) existing.lastName = data.lastName;
      await existing.save();
      return existing;
    }

    const user = await User.create({
      telegramId: data.telegramId,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      name: fullName, // Required field
      email: tempEmail, // Temporary email
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
