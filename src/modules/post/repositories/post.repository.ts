import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly dbRepository: Repository<PostEntity>,
  ) {}
  async findById(id: number): Promise<PostEntity> {
    return this.dbRepository.findOneBy({ id });
  }

  async findByCriteria(take: number, skip: number): Promise<PostEntity[]> {
    return this.dbRepository.find({ take, skip, relations: ['image', 'user', 'user.avatar'] });
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
    const { id, title, text } = updatePostDto;
    await this.dbRepository.update(id, {
      title,
      text,
    });
    return await this.findByIdWithRelations(id);
  }
  async findByIdWithRelations(id: number): Promise<PostEntity> {
    return this.dbRepository.findOne({
      where: { id: id },
      relations: ['image', 'user', 'user.avatar'],
    });
  }
}
