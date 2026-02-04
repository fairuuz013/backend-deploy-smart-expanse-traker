import multer from 'multer';
import path from 'path';
import fs from 'fs';

// --- LOGIKA ANTI-CRASH VERCEL ---
const isVercel = process.env.VERCEL === '1';

// Tentukan lokasi: /tmp untuk Vercel, uploads/ untuk laptop
const uploadDirectory = isVercel 
  ? path.join('/tmp', 'uploads', 'avatars') 
  : path.join(process.cwd(), 'uploads', 'avatars');

// Buat folder jika belum ada
if (!fs.existsSync(uploadDirectory)) {
  try {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  } catch (error) {
    console.error("Gagal membuat folder upload:", error);
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (_req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

export const uploadAvatar = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});