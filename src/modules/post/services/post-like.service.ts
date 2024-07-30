import { PostLikeRepository } from '../repositories/post-like.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { PostLikeEntity } from '../entities/post-like.entity';

@Injectable()
export class PostLikeService {
  constructor(private readonly postLikeRepository: PostLikeRepository) {}

  async setLike(like: Like): Promise<PostLikeEntity> {
    await this.throwExceptionIfExist(like);
    return this.postLikeRepository.create(like);
  }

  async removeLike(like: Like): Promise<void> {
    await this.throwExceptionIfNotExist(like);
    return this.postLikeRepository.delete(like);
  }

  async isExist(like: Like): Promise<boolean> {
    return this.postLikeRepository.isExist(like);
  }

  async throwExceptionIfExist(like: Like): Promise<void> {
    if (await this.isExist(like)) {
      throw new ConflictException('Already liked');
    }
  }

  async throwExceptionIfNotExist(like: Like): Promise<void> {
    if (!(await this.isExist(like))) {
      throw new ConflictException('Already unliked');
    }
  }
}
