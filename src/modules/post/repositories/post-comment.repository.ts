import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCommentEntity } from '../entities/post-comment.entity';
import { CreatePostComment } from '../types/create-post-comment';
import { IdsPostComment } from '../types/ids-post-comment';

@Injectable()
export class PostCommentRepository {
  constructor(
    @InjectRepository(PostCommentEntity)
    private readonly dbRepository: Repository<PostCommentEntity>,
  ) {}

  async create(comment: CreatePostComment): Promise<PostCommentEntity> {
    return this.dbRepository.save({ ...comment });
  }

  async deleteById(id: number): Promise<void> {
    await this.dbRepository.softDelete({ id });
  }

  async update(id: number, text: string): Promise<PostCommentEntity> {
    await this.dbRepository.update(id, { text });
    return await this.findById(id);
  }

  async findById(id: number): Promise<PostCommentEntity> {
    return this.dbRepository.findOneBy({ id });
  }

  async isExist(comment: IdsPostComment): Promise<boolean> {
    return this.dbRepository.existsBy({ ...comment });
  }

  async existById(id: number): Promise<boolean> {
    return this.dbRepository.existsBy({ id });
  }
}
