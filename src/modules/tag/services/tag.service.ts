import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from '../repositories/tag.repository';
import { TagEntity } from '../entities/tag.entity';
import { TagDto } from '../dtos/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createIfNotExist(tagDto: TagDto): Promise<TagEntity> {
    if (!(await this.existByName(tagDto.name))) {
      return this.tagRepository.create(tagDto);
    }
    return this.tagRepository.findByName(tagDto.name);
  }

  async findByName(name: string): Promise<TagEntity> {
    await this.throwExceptionIfNotExistByName(name);
    return this.tagRepository.findByName(name);
  }

  existByName(name: string): Promise<boolean> {
    return this.tagRepository.existByName(name);
  }

  async throwExceptionIfNotExistByName(name: string): Promise<void> {
    if (!(await this.existByName(name))) {
      throw new NotFoundException();
    }
  }
}
