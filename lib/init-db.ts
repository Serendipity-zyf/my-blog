import { sql } from '@vercel/postgres';

async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS views (
        id TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      );
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

initDatabase(); 