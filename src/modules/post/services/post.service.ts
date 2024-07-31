import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly configService: ConfigService,
  ) {}

  async findByIdWithRelations(id: number): Promise<PostEntity> {
    await this.throwExceptionIfNotExistById(id);
    return this.postRepository.findByIdWithRelations(id);
  }

  async findById(id: number): Promise<PostEntity> {
    await this.throwExceptionIfNotExistById(id);
    return this.postRepository.findById(id);
  }

  async findByCriteria(paginationDto: PaginationDto): Promise<PostEntity[]> {
    const {
      page = 0,
      limit = this.configService.get('pagination.defaultLimit'),
    } = paginationDto;
    return this.postRepository.findByCriteria(limit, page);
  }

  async create(createDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.create(createDto);
  }

  async update(updateUserDto: UpdatePostDto): Promise<PostEntity> {
    await this.throwExceptionIfNotExistById(updateUserDto.id);
    return this.postRepository.update(updateUserDto);
  }

  async deleteById(id: number): Promise<void> {
    await this.throwExceptionIfNotExistById(id);
    return this.postRepository.deleteById(id);
  }

  async throwExceptionIfNotExistById(id: number): Promise<void> {
    if (!(await this.existById(id))) {
      throw new NotFoundException();
    }
  }

  async existById(id: number): Promise<boolean> {
    return this.postRepository.existById(id);
  }
}
