import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCommentRepository } from '../repositories/post-comment.repository';
import { PostCommentEntity } from '../entities/post-comment.entity';
import { CreatePostComment } from '../types/create-post-comment.type';
import { IdsPostComment } from '../types/ids-post-comment.type';

@Injectable()
export class PostCommentService {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async create(comment: CreatePostComment): Promise<PostCommentEntity> {
    return this.postCommentRepository.create(comment);
  }

  async deleteById(id: number): Promise<void> {
    await this.throwExceptionIfNotExistById(id);
    return this.postCommentRepository.deleteById(id);
  }

  async update(id: number, commentText: string): Promise<PostCommentEntity> {
    await this.throwExceptionIfNotExistById(id);
    return await this.postCommentRepository.update(id, commentText);
  }

  async findById(id: number): Promise<PostCommentEntity> {
    await this.throwExceptionIfNotExistById(id);
    return this.postCommentRepository.findById(id);
  }

  async isExist(comment: IdsPostComment): Promise<boolean> {
    return this.postCommentRepository.isExist(comment);
  }

  async throwExceptionIfNotExist(comment: IdsPostComment): Promise<void> {
    if (!(await this.isExist(comment))) {
      throw new NotFoundException('Comment was not found');
    }
  }

  async existById(id: number): Promise<boolean> {
    return this.postCommentRepository.existById(id);
  }

  async throwExceptionIfNotExistById(commentId: number): Promise<void> {
    if (!(await this.existById(commentId))) {
      throw new NotFoundException('Comment was not found');
    }
  }
}
