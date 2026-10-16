import Resource from '../../models/Resource.js';
import Subject from '../../models/Subject.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { b2Client, B2_BUCKET } from '../../config/b2.js';
import { ResourceAPI } from './apiClient.js';

export async function getSubjectResources(subjectId: string, filters?: { type?: string }): Promise<any[]> {
  try {
    const where: any = { subjectId };
    
    if (filters?.type) {
      where.type = filters.type;
    }

    console.log('🔍 Resource query where:', JSON.stringify(where));
    console.log('🔍 Looking for subjectId:', subjectId);

    // First, check total resources in database
    const totalResources = await Resource.count();
    console.log(`📊 Total resources in entire database: ${totalResources}`);

    // Check if this subject exists
    const subjectExists = await Subject.findByPk(subjectId);
    console.log(`📚 Subject exists: ${!!subjectExists}`, subjectExists ? `(${subjectExists.name})` : '');

    const resources = await Resource.findAll({
      where,
      attributes: ['id', 'title', 'type', 'fileUrl', 'description', 'educationLevel', 'subjectId'],
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    console.log(`📦 Found ${resources.length} resources for this subject (array: ${Array.isArray(resources)})`);
    
    if (resources.length === 0) {
      // Check if there are ANY resources with this subjectId
      const anyWithSubject = await Resource.count({ where: { subjectId } });
      console.log(`🔍 Resources with subjectId="${subjectId}": ${anyWithSubject}`);
      
      // Check resources with NULL subjectId
      const nullSubjectCount = await Resource.count({ where: { subjectId: null } });
      console.log(`⚠️  Resources with NULL subjectId: ${nullSubjectCount}`);
    } else {
      console.log('📄 First resource:', resources[0].toJSON());
    }

    // Convert Sequelize instances to plain objects
    return resources.map(r => r.toJSON());
  } catch (error) {
    console.error('Error fetching subject resources:', error);
    return [];
  }
}

export async function searchResources(query: string, subjectId?: string): Promise<any[]> {
  try {
    const response = await ResourceAPI.getResources({
      subjectId,
      limit: 20,
    });

    if (!response.success) {
      return [];
    }

    const resources = response.data?.resources || response.data || [];
    
    // Filter by search query
    return resources.filter((r: any) => 
      r.title?.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching resources:', error);
    return [];
  }
}

export async function getResourceById(resourceId: string): Promise<any> {
  try {
    const resource = await Resource.findByPk(resourceId, {
      attributes: ['id', 'title', 'type', 'fileUrl', 'description', 'educationLevel'],
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['name', 'code'],
        },
      ],
    });

    return resource ? resource.toJSON() : null;
  } catch (error) {
    console.error('Error fetching resource by ID:', error);
    return null;
  }
}

export async function getResourceDownloadUrl(fileUrl: string): Promise<string> {
  try {
    // Extract the key from the B2 URL
    let key = '';
    
    if (fileUrl.includes('backblazeb2.com')) {
      const urlParts = fileUrl.split('/file/');
      if (urlParts.length > 1) {
        const fullPath = urlParts[1];
        const pathParts = fullPath.split('/');
        pathParts.shift(); // Remove bucket name
        key = pathParts.join('/');
      } else {
        const url = new URL(fileUrl);
        const pathname = url.pathname;
        const pathParts = pathname.split('/').filter(p => p);
        if (pathParts.length > 1) {
          pathParts.shift();
          key = pathParts.join('/');
        }
      }
    } else {
      // If it's already a key, use it directly
      key = fileUrl;
    }

    if (!key) {
      throw new Error('Could not extract file key from URL');
    }

    // Generate signed URL (valid for 1 hour)
    const command = new GetObjectCommand({
      Bucket: B2_BUCKET,
      Key: key,
    });

    const signedUrl = await getSignedUrl(b2Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating download URL:', error);
    throw error;
  }
}

export async function getResourceTypes(): Promise<string[]> {
  try {
    const types = [
      'lecture-slide',
      'handout',
      'note',
      'module',
      'reference-book',
      'mid-exam',
      'final-exam',
      'last-year-exam',
      'assignment',
      'solution',
    ];
    return types;
  } catch (error) {
    console.error('Error fetching resource types:', error);
    throw error;
  }
}
