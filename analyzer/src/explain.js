import { pool } from './db.js';
export async function getExplainJson(sql) {
  const text = `EXPLAIN (FORMAT JSON) ${sql}`;
  const { rows } = await pool.query(text);
  const plan = rows[0]['QUERY PLAN'];
  return Array.isArray(plan) ? plan[0] : plan;
}