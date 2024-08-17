import { PostLikeRepository } from '../repositories/post-like.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { PostLikeEntity } from '../entities/post-like.entity';
import { PostLike } from '../types/post-like.type';

@Injectable()
export class PostLikeService {
  constructor(private readonly postLikeRepository: PostLikeRepository) {}

  async setLike(like: PostLike): Promise<PostLikeEntity> {
    await this.throwExceptionIfExist(like);
    return this.postLikeRepository.create(like);
  }

  async removeLike(like: PostLike): Promise<void> {
    await this.throwExceptionIfNotExist(like);
    return this.postLikeRepository.delete(like);
  }

  async isExist(like: PostLike): Promise<boolean> {
    return this.postLikeRepository.isExist(like);
  }

  async throwExceptionIfExist(like: PostLike): Promise<void> {
    if (await this.isExist(like)) {
      throw new ConflictException('Already liked');
    }
  }

  async throwExceptionIfNotExist(like: PostLike): Promise<void> {
    if (!(await this.isExist(like))) {
      throw new ConflictException('Already unliked');
    }
  }
}
