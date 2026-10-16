import { User, Subject, Resource, SubjectAccess } from '../../../models/index.js';
import { Op } from 'sequelize';

export interface QuickStats {
  totalUsers: number;
  activeUsers: number;
  activeToday: number;
  totalSubjects: number;
  totalResources: number;
  downloadsToday: number;
  newUsersThisWeek: number;
  totalAccesses: number;
}

/**
 * Get quick statistics for admin dashboard
 */
export async function getQuickStats(): Promise<QuickStats> {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeToday,
      totalSubjects,
      totalResources,
      newUsersThisWeek,
      totalAccesses,
    ] = await Promise.all([
      User.count(),
      User.count({
        where: {
          updatedAt: { [Op.gte]: today },
        },
      }) as unknown as Promise<number>,
      Subject.count(),
      Resource.count(),
      User.count({
        where: {
          createdAt: { [Op.gte]: weekAgo },
        },
      }),
      SubjectAccess.count(),
    ]);

    return {
      totalUsers,
      activeUsers: totalUsers, // No isActive column, use total
      activeToday: activeToday as number,
      totalSubjects,
      totalResources,
      downloadsToday: 0, // TODO: Add download tracking
      newUsersThisWeek,
      totalAccesses,
    };
  } catch (error) {
    console.error('Error getting quick stats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      activeToday: 0,
      totalSubjects: 0,
      totalResources: 0,
      downloadsToday: 0,
      newUsersThisWeek: 0,
      totalAccesses: 0,
    };
  }
}

/**
 * Get detailed statistics
 */
export async function getDetailedStats() {
  try {
    const stats = await getQuickStats();

    // Get resources per subject
    const resourcesBySubject = await Resource.findAll({
      attributes: [
        'subjectId',
        [Resource.sequelize!.fn('COUNT', '*'), 'count'],
      ],
      group: ['subjectId'],
      order: [[Resource.sequelize!.fn('COUNT', '*'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['name', 'code'],
        },
      ],
    });

    // Get users by role
    const usersByRole = await User.findAll({
      attributes: [
        'role',
        [User.sequelize!.fn('COUNT', '*'), 'count'],
      ],
      group: ['role'],
    });

    return {
      ...stats,
      resourcesBySubject,
      usersByRole,
    };
  } catch (error) {
    console.error('Error getting detailed stats:', error);
    return null;
  }
}
