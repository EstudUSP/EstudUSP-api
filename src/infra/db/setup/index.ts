import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'silly.db.elephantsql.com',
  port: 5432,
  username: 'tdhnazzl',
  password: 'Upr0ImURun-lvAWN2tPQ16P14yMXr45G',
  database: 'tdhnazzl',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
