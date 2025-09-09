-- Более селективный фильтр (уменьшаем объём работы, как если бы делали DELETE батчами).
SELECT id
FROM orders
WHERE total < 10
  AND created_at < now() - interval '60 days';