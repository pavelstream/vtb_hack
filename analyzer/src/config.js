export const dbConfig = {
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE || 'testdb',
    user: process.env.PGUSER || 'read_only',
    password: process.env.PGPASSWORD || ''
  };
  export const appConfig = {
    port: Number(process.env.PORT || 3000),
    LARGE_SCAN_BYTES: 1 * 1024 * 1024, // 1MB
    MAX_NESTED_LOOP_OUTER_ROWS: 1000 // 1000 строк
  };