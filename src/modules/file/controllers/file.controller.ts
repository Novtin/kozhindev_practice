import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileEntity } from '../entities/file.entity';
import { FileSchema } from '../schemas/file.schema';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';
import * as fs from 'node:fs';
import { Response } from 'express';
import { join } from 'path';
import * as process from 'process';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse({
    type: FileSchema,
  })
  @UseInterceptors(new TransformInterceptor(FileSchema))
  @Get(':id')
  findById(@Param('id', ParseIntPipe) fileId: number): Promise<FileEntity> {
    return this.fileService.findById(fileId);
  }

  @Get('/image/:id')
  async findImageById(
    @Param('id', ParseIntPipe) fileId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileEntity: FileEntity = await this.fileService.findById(fileId);
    const path: string = join(
      ...process.env.FILE_SAVE_PATH.split('/'),
      fileEntity.name,
    );
    console.log(path);
    if (fs.existsSync(path)) {
      const imageStream = fs.createReadStream(path);
      res.set({
        'Content-Type': fileEntity.mimeType,
      });
      // photoStream.pipe(res); - можно и так
      return new StreamableFile(imageStream);
    } else {
      res.status(404).json({
        message: 'Not Found',
        statusCode: 404,
      });
    }
  }
}
