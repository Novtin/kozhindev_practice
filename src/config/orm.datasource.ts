import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as process from 'node:process';
import migrations from '../migrations';
import { UserEntity } from '../module/user/entities/user.entity';

const ENV_FILE = '.env';
dotenv.config({ path: ENV_FILE });
export default new DataSource({
  type: <any>process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [UserEntity],
  migrations,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrationsTableName: process.env.DB_MIGRATIONS_TABLE_NAME,
});
