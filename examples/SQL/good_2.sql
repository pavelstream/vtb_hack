SELECT o.id, o.user_id, o.total, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.email LIKE 'user4____@example.com';