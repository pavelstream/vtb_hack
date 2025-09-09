import express from 'express';
import 'dotenv/config';
import { appConfig } from './config.js';
import { testDbConnection } from './db.js';
import { getExplainJson } from './explain.js';
import { analyzePlan } from './analyze.js';

const app = express();
app.use(express.json({ limit: '1mb' }));

app.post('/explain', async (req, res) => {
  try {
    const { sql } = req.body || {};
    if (!sql || typeof sql !== 'string') return res.status(400).json({ error: 'Body must contain string "sql".' });
    const planRoot = await getExplainJson(sql);
    const result = analyzePlan(planRoot);
    res.json({ plan: planRoot, ...result });
  } catch (e) {
    res.status(500).json({ error: 'Explain failed', detail: `${e}` });
  }
});

app.listen(appConfig.port, async () => {
  try { await testDbConnection(); } catch(e){ console.error('DB check failed:', e); }
  console.log(`Explain Linter on http://localhost:${appConfig.port}`);
});
