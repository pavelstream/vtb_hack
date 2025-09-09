-- Плохой фильтр по неиндексированному столбцу: модель массового DELETE/UPDATE.
SELECT id
FROM orders
WHERE total < 10;