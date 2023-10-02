// USED TO SEEDS
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  url: process.env.DATABASE_URL,
  seeds: ['src/infra/db/seed/**/*{.ts,.js}'],
}
