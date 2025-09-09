SELECT *
FROM big_orders
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC;