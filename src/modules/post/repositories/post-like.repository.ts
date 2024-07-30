import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLikeEntity } from '../entities/post-like.entity';

@Injectable()
export class PostLikeRepository {
  constructor(
    @InjectRepository(PostLikeEntity)
    private readonly dbRepository: Repository<PostLikeEntity>,
  ) {}

  async create(like: Like): Promise<PostLikeEntity> {
    return this.dbRepository.save({ ...like });
  }

  async delete(like: Like): Promise<void> {
    await this.dbRepository.delete({ ...like });
  }

  async findOne(like: Like): Promise<PostLikeEntity> {
    return this.dbRepository.findOneBy({ ...like });
  }

  async isExist(like: Like): Promise<boolean> {
    return this.dbRepository.existsBy({ ...like });
  }
}
