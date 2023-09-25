import { DataSource } from 'typeorm';

import { Recommendation } from './schema/recommendation';
import { Question } from './schema/question';
import { User } from './schema/user';
import { Reply } from './schema/reply';
import { Tag } from './schema/tag';
import { Professor } from './schema/professor';
import { Subject } from './schema/subject';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  subscribers: [],
  migrations: [],
  entities: [
    User,
    Question,
    Recommendation,
    Reply,
    Tag,
    Professor,
    Subject,
  ],
});

export default AppDataSource;
