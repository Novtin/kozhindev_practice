import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entities/tag.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly dbRepository: Repository<TagEntity>,
  ) {}

  async create<T extends DeepPartial<TagEntity>>(
    entity: T,
  ): Promise<TagEntity> {
    return this.dbRepository.save(entity);
  }

  async findByName(name: string): Promise<TagEntity> {
    return this.dbRepository.findOneBy({ name });
  }

  async existByName(name: string): Promise<boolean> {
    return this.dbRepository.existsBy({ name });
  }
}
