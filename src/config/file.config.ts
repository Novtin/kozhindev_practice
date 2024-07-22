import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('file', () => ({
  fileSavePath: process.env.FILE_SAVE_PATH,
}));
