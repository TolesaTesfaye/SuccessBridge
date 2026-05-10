import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import { ResourceService } from '../services/resourceService.js'
import { AppError } from '../middleware/errorHandler.js'

export const getResources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query as any
    const result = await ResourceService.getResources(filters)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Fetch resources error:', error)
    next(error)
  }
}

export const getResourceStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await ResourceService.getResourceStats()
    res.json({ success: true, data: stats })
  } catch (error) {
    console.error('Get resource stats error:', error)
    next(error)
  }
}

export const getResourceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resource = await ResourceService.getResourceById(req.params.id)
    res.json({ success: true, data: resource })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Fetch resource error:', error)
    next(error)
  }
}

export const createResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Create resource request body:', req.body)
    console.log('Create resource file:', req.file)
    
    const createdBy = req.user!.userId
    const resource = await ResourceService.createResource(req.body, req.file, createdBy)

    res.status(201).json({ success: true, data: resource })
  } catch (error) {
    console.error('Resource creation error details:', error)
    console.error('Error stack:', (error as Error).stack)
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    
    // Return 500 with detailed error message
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message || 'Failed to create resource',
      details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    })
  }
}

export const updateResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resource = await ResourceService.updateResource(req.params.id, req.body)
    res.json({ success: true, data: resource })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Update resource error:', error)
    next(error)
  }
}

export const deleteResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ResourceService.deleteResource(req.params.id)
    res.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Delete resource error:', error)
    next(error)
  }
}

export const getResourcePreview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    // Get resource from database
    const resource = await ResourceService.getResourceById(id)
    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    const fileUrl = resource.fileUrl

    console.log('🖼️ Preview request for resource:', {
      id: resource.id,
      title: resource.title,
      fileUrl: fileUrl
    })

    // Check if it's a B2 URL
    if (fileUrl.includes('backblazeb2.com')) {
      // Extract the key from the URL
      let key = '';
      
      const urlParts = fileUrl.split('/file/')
      if (urlParts.length > 1) {
        const fullPath = urlParts[1]
        const pathParts = fullPath.split('/')
        pathParts.shift() // Remove bucket name
        key = pathParts.join('/')
      } else {
        const url = new URL(fileUrl);
        const pathname = url.pathname;
        const pathParts = pathname.split('/').filter(p => p);
        if (pathParts.length > 1) {
          pathParts.shift();
          key = pathParts.join('/');
        }
      }
      
      if (key) {
        console.log('🔐 Generating signed URL for preview, key:', key)
        
        // Import the signed URL function
        const { getB2SignedUrl } = await import('../middleware/b2Upload.js')
        
        // Generate signed URL for preview (no force download, valid for 1 hour)
        const signedUrl = await getB2SignedUrl(key, 3600, false)
        
        console.log('✅ Returning signed URL for preview')
        return res.json({ success: true, url: signedUrl })
      } else {
        console.error('❌ Could not extract key from URL:', fileUrl)
        throw new AppError(404, 'Invalid file URL format')
      }
    }
    
    // If not B2, return original URL
    return res.json({ success: true, url: fileUrl })
    
  } catch (error) {
    console.error('❌ Preview error:', error)
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    
    next(error)
  }
}

export const downloadResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    // Get resource from database to verify it exists
    const resource = await ResourceService.getResourceById(id)
    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    const fileUrl = resource.fileUrl

    console.log('📥 Download request for resource:', {
      id: resource.id,
      title: resource.title,
      fileUrl: fileUrl
    })

    // Check if client wants JSON response (for fetch API) or redirect (for direct link)
    const acceptsJson = req.headers.accept?.includes('application/json');

    // Check if it's a B2/S3 URL (starts with https://)
    if (fileUrl.startsWith('https://') || fileUrl.startsWith('http://')) {
      // Check if URL contains B2 domain (indicating it's stored in B2)
      if (fileUrl.includes('backblazeb2.com')) {
        // Extract the key from the URL
        // Format: https://f833.backblazeb2.com/file/successbridge-resources/resources/123-file.pdf
        let key = '';
        
        const urlParts = fileUrl.split('/file/')
        if (urlParts.length > 1) {
          const fullPath = urlParts[1] // successbridge-resources/resources/123-file.pdf
          const pathParts = fullPath.split('/')
          pathParts.shift() // Remove bucket name
          key = pathParts.join('/') // resources/123-file.pdf
        } else {
          // Alternative format: try to extract from URL path
          const url = new URL(fileUrl);
          const pathname = url.pathname; // /successbridge-resources/resources/123-file.pdf
          const pathParts = pathname.split('/').filter(p => p); // Remove empty parts
          if (pathParts.length > 1) {
            pathParts.shift(); // Remove bucket name
            key = pathParts.join('/');
          }
        }
        
        if (key) {
          console.log('🔐 Generating signed URL for private bucket, key:', key)
          
          // Import the signed URL function
          const { getB2SignedUrl } = await import('../middleware/b2Upload.js')
          
          // Generate signed URL with force download (valid for 1 hour)
          const signedUrl = await getB2SignedUrl(key, 3600, true)
          
          // If client accepts JSON, return the URL (for fetch API)
          if (acceptsJson) {
            console.log('✅ Returning signed URL as JSON')
            return res.json({ success: true, url: signedUrl })
          }
          
          // Otherwise redirect (for direct browser access)
          console.log('✅ Redirecting to signed URL (valid for 1 hour)')
          return res.redirect(302, signedUrl)
        } else {
          console.error('❌ Could not extract key from URL:', fileUrl)
          throw new AppError(404, 'Invalid file URL format')
        }
      }
      
      // If not B2, return or redirect to original URL
      if (acceptsJson) {
        return res.json({ success: true, url: fileUrl })
      }
      console.log('✅ Redirecting to original URL:', fileUrl)
      return res.redirect(302, fileUrl)
    }

    // Handle local file download (legacy support)
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    const resolvedUploadDir = path.resolve(uploadDir)
    let fileName = fileUrl
    
    // Remove /uploads/ prefix if present
    if (fileName.startsWith('/uploads/')) {
      fileName = fileName.replace('/uploads/', '')
    } else if (fileName.startsWith('uploads/')) {
      fileName = fileName.replace('uploads/', '')
    }
    
    const filePath = path.join(resolvedUploadDir, fileName)

    console.log('📂 Looking for local file:', filePath)

    // Check if file exists on disk
    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath)
      throw new AppError(404, `File not found on server: ${fileName}`)
    }

    // Get file stats
    const stats = fs.statSync(filePath)
    const fileSize = stats.size

    // Set appropriate headers for download
    const ext = path.extname(fileName).toLowerCase()
    let contentType = 'application/octet-stream'
    
    // Set content type based on file extension
    switch (ext) {
      case '.pdf':
        contentType = 'application/pdf'
        break
      case '.doc':
      case '.docx':
        contentType = 'application/msword'
        break
      case '.xls':
      case '.xlsx':
        contentType = 'application/vnd.ms-excel'
        break
      case '.ppt':
      case '.pptx':
        contentType = 'application/vnd.ms-powerpoint'
        break
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.mp4':
        contentType = 'video/mp4'
        break
      case '.mp3':
        contentType = 'audio/mpeg'
        break
      case '.txt':
        contentType = 'text/plain'
        break
    }

    console.log('✅ Streaming local file:', {
      fileName,
      contentType,
      fileSize
    })

    // Set headers for download
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Length', fileSize)
    res.setHeader('Content-Disposition', `attachment; filename="${resource.title}${ext}"`)
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // Stream the file
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)

    fileStream.on('error', (error) => {
      console.error('❌ File stream error:', error)
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Error reading file' })
      }
    })

  } catch (error) {
    console.error('❌ Download resource error:', error)
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    
    // Log detailed error for debugging
    console.error('❌ Download error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      resourceId: req.params.id
    })
    
    next(error)
  }
}

export const debugResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    // Get resource from database
    const resource = await ResourceService.getResourceById(id)
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' })
    }

    // Check file system
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    const resolvedUploadDir = path.resolve(uploadDir)
    let fileName = resource.fileUrl
    
    if (fileName.startsWith('/uploads/')) {
      fileName = fileName.replace('/uploads/', '')
    } else if (fileName.startsWith('uploads/')) {
      fileName = fileName.replace('uploads/', '')
    }
    
    const filePath = path.join(resolvedUploadDir, fileName)
    const fileExists = fs.existsSync(filePath)
    
    // List all files in uploads directory
    const allFiles = fs.readdirSync(resolvedUploadDir)
    
    res.json({
      success: true,
      debug: {
        resource: {
          id: resource.id,
          title: resource.title,
          fileUrl: resource.fileUrl,
          type: resource.type
        },
        filesystem: {
          uploadDir: resolvedUploadDir,
          fileName,
          filePath,
          fileExists,
          allFiles: allFiles.slice(0, 10) // Show first 10 files
        }
      }
    })
    
  } catch (error) {
    console.error('Debug resource error:', error)
    next(error)
  }
}