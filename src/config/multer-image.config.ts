import { diskStorage } from 'multer';
import * as uuid from 'uuid';
import { extname, join } from 'path';
import * as process from 'process';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'node:fs';

const getMulterImageOptions = (): MulterOptions => {
  return {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const uploadPath: string = join(
          ...process.env.FILE_SAVE_PATH.split('/'),
        );
        fs.access(uploadPath, fs.constants.F_OK, (err) => {
          if (err) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
        });
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        const uniqueSuffix: string = uuid.v4();
        const ext: string = extname(file.originalname);
        const filename: string = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (file.mimetype.includes('image')) {
        callback(null, true);
      } else {
        callback(
          new UnsupportedMediaTypeException(
            `Unsupported file MIME type ${file.mimetype}`,
          ),
          false,
        );
      }
    },
    limits: {
      fileSize: Math.pow(1024, 2) * 10, // 10 МБ
    },
  };
};
export const multerImageOptions = getMulterImageOptions();
