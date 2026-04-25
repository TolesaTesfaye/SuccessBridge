import multer from 'multer';
import multerS3 from 'multer-s3';
import { b2Client, B2_BUCKET } from '../config/b2.js';
import path from 'path';

// Configure multer to use Backblaze B2
export const b2Upload = multer({
  storage: multerS3({
    s3: b2Client,
    bucket: B2_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = `resources/${uniqueSuffix}${ext}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (B2 supports up to 5GB)
  },
  fileFilter: (req, file, cb) => {
    // Allow PDFs, images, videos, documents
    const allowedTypes = /pdf|jpg|jpeg|png|gif|mp4|mov|avi|doc|docx|ppt|pptx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDFs, images, videos, and documents are allowed.'));
    }
  },
});
