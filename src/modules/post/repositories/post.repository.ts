import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../../file/entities/file.entity';
import { TagEntity } from '../../tag/entities/tag.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly dbRepository: Repository<PostEntity>,
  ) {}
  private readonly RELATIONS: string[] = [
    'image',
    'user',
    'user.avatar',
    'likes',
    'tags',
    'comments',
    'comments.user',
    'comments.user.avatar',
  ];
  async findById(id: number): Promise<PostEntity> {
    return this.dbRepository.findOneBy({ id });
  }

  async findByCriteria(take: number, skip: number): Promise<PostEntity[]> {
    return this.dbRepository.find({
      take,
      skip,
      relations: this.RELATIONS,
    });
  }

  async existById(id: number): Promise<boolean> {
    return this.dbRepository.existsBy({ id });
  }

  async create<T extends DeepPartial<PostEntity>>(
    entity: T,
  ): Promise<PostEntity> {
    return await this.findByIdWithRelations(
      (await this.dbRepository.save(entity))?.id,
    );
  }

  async deleteById(id: number): Promise<void> {
    await this.dbRepository.softDelete({ id });
  }

  async update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
    await this.dbRepository.update(updatePostDto.id, updatePostDto);
    return await this.findByIdWithRelations(updatePostDto.id);
  }

  async updateImage(id: number, image: FileEntity): Promise<PostEntity> {
    await this.dbRepository.update(id, { image });
    return await this.findByIdWithRelations(id);
  }

  async updateTags(id: number, tags: TagEntity[]): Promise<PostEntity> {
    await this.dbRepository.save({ id, tags });
    return await this.findByIdWithRelations(id);
  }

  async findByIdWithRelations(id: number): Promise<PostEntity> {
    return this.dbRepository.findOne({
      where: { id: id },
      relations: this.RELATIONS,
    });
  }

  async findByUserId(userId: number): Promise<PostEntity[]> {
    return this.dbRepository.find({
      where: { userId },
      relations: this.RELATIONS,
    });
  }
}
