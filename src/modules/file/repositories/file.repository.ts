import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly dbRepository: Repository<FileEntity>,
  ) {}

  async findById(id: number): Promise<FileEntity> {
    return this.dbRepository.findOneBy({ id });
  }

  async existById(id: number): Promise<boolean> {
    return this.dbRepository.existsBy({ id });
  }

  async create<T extends DeepPartial<FileEntity>>(
    entity: T,
  ): Promise<FileEntity> {
    return this.dbRepository.save(entity);
  }

  async deleteById(id: number): Promise<void> {
    await this.dbRepository.delete({ id });
  }
}
