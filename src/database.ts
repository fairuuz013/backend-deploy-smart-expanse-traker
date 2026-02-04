import { createRequire } from 'module';
import { Pool } from 'pg'; 
import config from './utils/env.js';

// --- SOLUSI ERROR VERCEL ---
// Kita buat fungsi 'require' sendiri supaya bisa baca Prisma Client versi CommonJS
const require = createRequire(import.meta.url);

// Import Library pakai 'require' agar tidak Error "does not provide export"
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

// Setup koneksi ke Neon Tech
const pool = new Pool({ 
    connectionString: config.DATABASE_URL 
});

// Pasang Adapter
const adapter = new PrismaPg(pool);

// Inisialisasi Prisma
const prisma = new PrismaClient({ 
    adapter 
});

export default prisma;