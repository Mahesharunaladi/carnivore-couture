// server.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';

// ───────────────────────────────────────────────────────────────────────────────
// 0) Early error logging (so crashes show clear reasons)
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

// ───────────────────────────────────────────────────────────────────────────────
// 1) Load environment variables robustly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple locations so it works whether you run from repo root or /backend
dotenv.config(); // load from current working directory
dotenv.config({ path: path.join(__dirname, '.env') }); // load .env next to server.js if present
dotenv.config({ path: path.join(__dirname, 'backend', '.env') }); // load backend/.env if present

// ───────────────────────────────────────────────────────────────────────────────
// 2) Basic app setup
const app = express();
app.use(express.json());

// ───────────────────────────────────────────────────────────────────────────────
// 3) CORS configuration
//    - Allows explicitly configured origins via env
//    - Plus any localhost/127.0.0.1 port in non-production (handy for Vite 5173/5174)
//    - Credentials enabled for cookies; set to false if you don't use cookies
const explicitAllowed = [
  process.env.FRONTEND_URL, // e.g., http://localhost:5173
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()) : []),
  // sensible dev defaults
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

// de-duplicate
const allowSet = new Set(explicitAllowed);
const allowedOrigins = [...allowSet];

const isLocalDevOrigin = (origin) => {
  if (process.env.NODE_ENV === 'production') return false;
  try {
    const u = new URL(origin);
    const hostOK = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    return hostOK && (!u.port || /^\d+$/.test(u.port)); // any numeric port
  } catch {
    return false;
  }
};

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Your frontend URL from .env
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};

console.log('CORS_ORIGIN:', process.env.FRONTEND_URL); // Log the configured origin

// Apply CORS middleware BEFORE routes and other middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS preflight requests for /api/auth routes using a regex
// app.options(//api/auth/.*/, cors(corsOptions)); // REMOVE OR COMMENT OUT THIS LINE

// Middleware to log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log('Request Origin:', req.headers.origin); // Log the request origin
  next();
});

app.use(express.json());

// ───────────────────────────────────────────────────────────────────────────────
// 4) Logging (helps find Origin mismatches quickly)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | Origin: ${req.headers.origin || '-'}`);
  next();
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// ───────────────────────────────────────────────────────────────────────────────
// 5) Routes
app.use('/api/auth', authRoutes);

// ───────────────────────────────────────────────────────────────────────────────
// 6) Database
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Define it in your .env file.');
  process.exit(1);
}

const isAtlas = MONGODB_URI.includes('mongodb+srv://');
const mongooseOptions = {
  retryWrites: true,
  w: 'majority',
  // Use TLS for Atlas; for local MongoDB typically omit tls
  ...(isAtlas ? { tls: true } : {}),
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err?.message || err);
    process.exit(1);
  });

// ───────────────────────────────────────────────────────────────────────────────
// 7) Start server
// Default to 8000 to avoid macOS AirPlay (commonly uses 5000).
const PORT = Number(process.env.PORT) || 8000;

const server = app.listen(PORT, () => {
  console.log('────────────────────────────────────────────');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔐 CORS credentials: ${corsOptions.credentials ? 'enabled' : 'disabled'}`);
  console.log('────────────────────────────────────────────');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Pick a different PORT or free it.`);
    console.error(`   macOS tip: lsof -i :${PORT}  # then kill -9 <PID>`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
