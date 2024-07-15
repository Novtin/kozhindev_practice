import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('http', () => ({
  port: process.env.HTTP_PORT,
  host: process.env.HTTP_HOST,
}));
