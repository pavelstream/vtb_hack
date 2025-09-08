--1 млн
INSERT INTO big_orders (user_id, product_id, total, created_at)
SELECT
  (random()*49999 + 1)::int,
  (random()*999 + 1)::int,
  (random()*200 + 5)::numeric(10,2),
  now() - (random()*'30 days'::interval)
FROM generate_series(1, 1000000);