import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('pagination', () => ({
  defaultLimit: process.env.PAGINATION_DEFAULT_LIMIT,
}));
