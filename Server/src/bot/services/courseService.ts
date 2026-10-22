import Subject from '../../models/Subject.js';
import Resource from '../../models/Resource.js';
import SubjectAccess from '../../models/SubjectAccess.js';
import StudentProgress from '../../models/StudentProgress.js';
import Grade from '../../models/Grade.js';
import Stream from '../../models/Stream.js';
import Department from '../../models/Department.js';
import University from '../../models/University.js';
import { Op } from 'sequelize';

export async function getAllCourses(): Promise<any[]> {
  try {
    const subjects = await Subject.findAll({
      attributes: ['id', 'name', 'code'],
      include: [
        {
          model: Grade,
          as: 'grade',
          attributes: ['name'],
          required: false,
        },
        {
          model: Stream,
          as: 'stream',
          attributes: ['name'],
          required: false,
        },
        {
          model: Department,
          as: 'department',
          attributes: ['name'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 50,
    });
    return subjects;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

export async function getCourseById(courseId: string): Promise<any> {
  try {
    const subject = await Subject.findByPk(courseId, {
      attributes: ['id', 'name', 'code'],
      include: [
        {
          model: Grade,
          as: 'grade',
          attributes: ['name'],
          required: false,
        },
        {
          model: Stream,
          as: 'stream',
          attributes: ['name'],
          required: false,
        },
        {
          model: Department,
          as: 'department',
          attributes: ['name'],
          required: false,
        },
      ],
    });
    return subject;
  } catch (error) {
    console.error('Error fetching subject by ID:', error);
    throw error;
  }
}

export async function getUserCourses(userId: string): Promise<any[]> {
  try {
    const accesses = await SubjectAccess.findAll({
      where: { 
        userId,
        [Op.or]: [
          { expiresAt: null },
          { expiresAt: { [Op.gt]: new Date() } }
        ]
      },
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name', 'code'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Get progress for each subject
    const subjectsWithProgress = await Promise.all(
      accesses.map(async (access: any) => {
        const progress = await StudentProgress.findOne({
          where: {
            studentId: userId,
            subjectId: access.subjectId,
          },
        });

        return {
          id: access.subject.id,
          title: access.subject.name,
          code: access.subject.code,
          progress: progress ? Math.min(100, (progress.resourcesCompleted * 10)) : 0,
          accessedAt: access.accessGrantedAt,
          expiresAt: access.expiresAt,
        };
      })
    );

    return subjectsWithProgress;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
}

export async function getCourseResources(courseId: string): Promise<any[]> {
  try {
    const resources = await Resource.findAll({
      where: {
        subjectId: courseId,
      },
      attributes: ['id', 'title', 'type', 'fileUrl', 'fileSize'],
      order: [['createdAt', 'ASC']],
    });
    return resources;
  } catch (error) {
    console.error('Error fetching course resources:', error);
    throw error;
  }
}

export async function enrollInCourse(
  userId: string,
  courseId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    // Note: In your system, enrollment requires payment
    // For the bot, we'll return a message about payment requirement
    
    // Check if already has access
    const existing = await SubjectAccess.findOne({
      where: { 
        userId, 
        subjectId: courseId,
        [Op.or]: [
          { expiresAt: null },
          { expiresAt: { [Op.gt]: new Date() } }
        ]
      },
    });

    if (existing) {
      return {
        success: false,
        message: 'You already have access to this subject.',
      };
    }

    return {
      success: false,
      message: 'To unlock full access, please subscribe! Contact @Tol_man27 on Telegram or use /payment command for details.',
    };
  } catch (error) {
    console.error('Error checking subject access:', error);
    return {
      success: false,
      message: 'Failed to check enrollment status.',
    };
  }
}

export async function searchCourses(query: string): Promise<any[]> {
  try {
    const subjects = await Subject.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { code: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ['id', 'name', 'code'],
      limit: 10,
    });
    return subjects;
  } catch (error) {
    console.error('Error searching subjects:', error);
    throw error;
  }
}
