import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3Client, S3_BUCKET } from '../config/s3.js'
import path from 'path'

// Configure multer to use S3
export const s3Upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const filename = uniqueSuffix + path.extname(file.originalname)
      cb(null, `resources/${filename}`)
    },
  }),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB default
  },
  fileFilter: (req, file, cb) => {
    // Accept common document and media types
    const allowedTypes = /pdf|doc|docx|ppt|pptx|xls|xlsx|txt|jpg|jpeg|png|gif|mp4|mp3/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only documents, images, and media files are allowed.'))
    }
  },
})
