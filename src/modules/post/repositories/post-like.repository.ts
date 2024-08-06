import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLikeEntity } from '../entities/post-like.entity';
import { PostLike } from '../types/post-like';

@Injectable()
export class PostLikeRepository {
  constructor(
    @InjectRepository(PostLikeEntity)
    private readonly dbRepository: Repository<PostLikeEntity>,
  ) {}

  async create(like: PostLike): Promise<PostLikeEntity> {
    return this.dbRepository.save({ ...like });
  }

  async delete(like: PostLike): Promise<void> {
    await this.dbRepository.delete({ ...like });
  }

  async findOne(like: PostLike): Promise<PostLikeEntity> {
    return this.dbRepository.findOneBy({ ...like });
  }

  async isExist(like: PostLike): Promise<boolean> {
    return this.dbRepository.existsBy({ ...like });
  }
}
