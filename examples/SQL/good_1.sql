SELECT id, user_id, total, created_at
FROM orders
WHERE created_at > now() - interval '3 days'
ORDER BY created_at DESC
LIMIT 100;