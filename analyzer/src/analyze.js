import { appConfig } from './config.js';
export function analyzePlan(planRoot) {
  const nodes = [];
  walk(planRoot.Plan, nodes);
  const totalRows = sum(nodes.map(n => n['Plan Rows'] || 0));
  const avgWidth = planRoot.Plan['Plan Width'] || 0;
  const scanBytes = sum(nodes.map(n => (n['Plan Rows'] || 0) * (n['Plan Width'] || avgWidth || 0)));
  const blocks = Math.ceil(scanBytes / 8192);

  const risks = [];
  nodes.forEach(n => {
    const t = n['Node Type'] || '';
    if (t.includes('Seq Scan')) {
      const rows = n['Plan Rows'] || 0;
      const width = n['Plan Width'] || avgWidth || 0;
      if (rows * width >= appConfig.LARGE_SCAN_BYTES) {
        risks.push({ level: 'high', type: 'seq_scan_large', message: 'Последовательный скан по большому объёму.' });
      }
    }
  });
  if (nodes.some(n => (n['Node Type'] || '') === 'Nested Loop') && totalRows >= appConfig.MAX_NESTED_LOOP_OUTER_ROWS) {
    risks.push({ level: 'high', type: 'nested_loop', message: 'Nested Loop на большом наборе (возможно, нет индекса на ключах JOIN).' });
  }
  const recommendations = [];
  if (risks.find(r => r.type === 'seq_scan_large')) {
    recommendations.push({ priority: 'high', kind: 'index', message: 'Индекс под WHERE/ORDER BY по полю фильтра/сортировки или сужение выборки/LIMIT.' });
  }
  if (risks.find(r => r.type === 'nested_loop')) {
    recommendations.push({ priority: 'high', kind: 'index', message: 'Добавить индекс на столбцы JOIN или переписать соединение.' });
  }
  return { metrics: { totalRows, scanBytes, blocks }, risks, recommendations };
}
function walk(node, acc) { if (!node) return; acc.push(node); for (const ch of (node.Plans || [])) walk(ch, acc); }
function sum(a){return a.reduce((x,y)=>x+(y||0),0)}