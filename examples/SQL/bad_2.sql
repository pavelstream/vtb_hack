SELECT o.*
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.email LIKE 'user4____@example.com';