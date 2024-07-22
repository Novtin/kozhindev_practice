import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../repositories/file.repository';
import { FileEntity } from '../entities/file.entity';
import { FileDto } from '../dtos/file.dto';
import * as fs from 'node:fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
  ) {}

  async findById(id: number): Promise<FileEntity> {
    await this.throwExceptionIfNotExistById(id);
    return this.fileRepository.findById(id);
  }

  async existById(id: number): Promise<boolean> {
    return this.fileRepository.existById(id);
  }

  async create(file: Express.Multer.File): Promise<FileEntity> {
    const fileDto: FileDto = { name: file.filename, mimeType: file.mimetype };
    return this.fileRepository.create(fileDto);
  }

  async deleteById(id: number): Promise<void> {
    await this.throwExceptionIfNotExistById(id);
    const file: FileEntity = await this.findById(id);
    const path: string = join(
      ...this.configService.get('file.fileSavePath').split('/'),
      file.name,
    );
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file ${path}:`, err);
      }
    });
    return this.fileRepository.deleteById(id);
  }

  async throwExceptionIfNotExistById(id: number): Promise<void> {
    if (!(await this.existById(id))) {
      throw new NotFoundException();
    }
  }
}
