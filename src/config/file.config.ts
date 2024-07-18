import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('file', () => ({
  fileAvatarsPath: process.env.FILE_AVATARS_PATH,
}));
