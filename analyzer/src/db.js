import pg from 'pg';
import { dbConfig } from './config.js';
export const pool = new pg.Pool(dbConfig);
export async function testDbConnection() {
  const c = await pool.connect();
  try {
    const r = await c.query('SELECT current_user, current_database()');
    console.log('DB OK:', r.rows[0]);
  } finally { c.release(); }
}