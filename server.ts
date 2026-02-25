import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'arena.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    time_slot INTEGER NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    UNIQUE(date, time_slot)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare('SELECT COUNT(*) as count FROM reviews').get() as { count: number };
if (count.count === 0) {
  const insertReview = db.prepare('INSERT INTO reviews (customer_name, rating, comment) VALUES (?, ?, ?)');
  insertReview.run('Rahim', 5, 'Amazing turf! The grass quality is top notch and the night lighting is perfect.');
  insertReview.run('Karim', 4, 'Great place to play with friends. Will definitely come back.');
  insertReview.run('Jashim', 5, 'Best turf in Chittagong! The view of the Karnafully river is a bonus.');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/slots', (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date is required' });
    
    const bookings = db.prepare('SELECT time_slot, customer_name FROM bookings WHERE date = ?').all(date);
    res.json(bookings);
  });

  app.post('/api/admin/book', (req, res) => {
    const { date, time_slot, customer_name, customer_phone, password } = req.body;
    if (password !== 'admin123') return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      db.prepare('INSERT INTO bookings (date, time_slot, customer_name, customer_phone) VALUES (?, ?, ?, ?)').run(date, time_slot, customer_name || '', customer_phone || '');
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: 'Slot already booked or invalid data' });
    }
  });

  app.post('/api/admin/unbook', (req, res) => {
    const { date, time_slot, password } = req.body;
    if (password !== 'admin123') return res.status(401).json({ error: 'Unauthorized' });
    
    db.prepare('DELETE FROM bookings WHERE date = ? AND time_slot = ?').run(date, time_slot);
    res.json({ success: true });
  });

  app.get('/api/reviews', (req, res) => {
    const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
    res.json(reviews);
  });

  app.post('/api/reviews', (req, res) => {
    const { customer_name, rating, comment } = req.body;

    const safeName = typeof customer_name === 'string' ? customer_name.trim() : '';
    const safeComment = typeof comment === 'string' ? comment.trim() : '';
    const safeRating = Number(rating);

    if (!safeName || !safeComment || !Number.isInteger(safeRating) || safeRating < 1 || safeRating > 5) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const result = db
      .prepare('INSERT INTO reviews (customer_name, rating, comment) VALUES (?, ?, ?)')
      .run(safeName, safeRating, safeComment);

    const newReview = db
      .prepare('SELECT * FROM reviews WHERE id = ?')
      .get(result.lastInsertRowid);

    res.status(201).json(newReview);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
