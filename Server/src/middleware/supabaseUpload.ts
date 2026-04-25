import multer from 'multer';
import { supabase, SUPABASE_BUCKET } from '../config/supabase.js';
import path from 'path';

// Configure multer for memory storage (Supabase needs buffer)
const storage = multer.memoryStorage();

export const supabaseUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
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

// Helper function to upload file to Supabase
export async function uploadToSupabase(file: Express.Multer.File): Promise<string> {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const filename = `resources/${uniqueSuffix}${ext}`;

  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(filename);

  return urlData.publicUrl;
}
