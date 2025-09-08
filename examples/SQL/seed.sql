-- Наполняем тестовыми данными (умеренные объёмы, чтобы быстро загрузилось)

-- 1) Товары (1000 шт.)
INSERT INTO products (name, price)
SELECT 'Product ' || g, (random()*100 + 1)::numeric(10,2)
FROM generate_series(1, 1000) g;

-- 2) Пользователи (50 000 шт.)
INSERT INTO users (name, email, created_at)
SELECT
  'User ' || g,
  'user' || g || '@example.com',
  now() - (g || ' minutes')::interval
FROM generate_series(1, 50000) g;

-- 3) Заказы (200 000 шт.)
INSERT INTO orders (user_id, product_id, total, created_at)
SELECT
  (random()*49999 + 1)::int,
  (random()*999 + 1)::int,
  (random()*200 + 5)::numeric(10,2),
  now() - (random()*'30 days'::interval)
FROM generate_series(1, 200000);