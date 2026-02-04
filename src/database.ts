import { createRequire } from 'module';
import { Pool } from 'pg'; 
import config from './utils/env.js'; // Pastikan path ini benar sesuai struktur foldermu

// Bikin fungsi 'require' manual untuk menjembatani ESM ke CommonJS
const require = createRequire(import.meta.url);

// Import Prisma pakai cara 'require' (Anti-Error Vercel)
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ 
    connectionString: config.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ 
    adapter 
});

export default prisma;