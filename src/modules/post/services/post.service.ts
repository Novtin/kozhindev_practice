import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { FileService } from '../../file/services/file.service';
import { FileEntity } from '../../file/entities/file.entity';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { CreatePostDetailDto } from '../dtos/create-post-detail.dto';
import { TagDto } from '../../tag/dtos/tag.dto';
import { TagService } from '../../tag/services/tag.service';

@Injectable()
export class PostService {
  constructor(
    private readonly configService: ConfigService,
    private readonly postRepository: PostRepository,
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly tagService: TagService,
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

  async findByUserId(userId: number): Promise<PostEntity[]> {
    return this.postRepository.findByUserId(userId);
  }

  async findFromSubscriptions(userId: number): Promise<PostEntity[]> {
    const userEntity: UserEntity =
      await this.userService.findByIdWithRelations(userId);
    const postsFromSubscriptions: PostEntity[] = [];
    for (const subscription of userEntity.subscriptions) {
      postsFromSubscriptions.push(
        ...(await this.findByUserId(subscription.id)),
      );
    }
    return postsFromSubscriptions;
  }

  async create(createDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.create(createDto);
  }

  async createDetail(
    createPostDetailDto: CreatePostDetailDto,
  ): Promise<PostEntity> {
    const postEntity: PostEntity = await this.create(createPostDetailDto);
    postEntity.tags = await Promise.all(
      createPostDetailDto.tags.map(
        async (tagDto: TagDto): Promise<TagEntity> =>
          await this.tagService.createIfNotExist(tagDto),
      ),
    );
    return this.updateTags(postEntity.id, postEntity.tags);
  }

  async update(updateUserDto: UpdatePostDto): Promise<PostEntity> {
    await this.throwExceptionIfNotExistById(updateUserDto.id);
    return this.postRepository.update(updateUserDto);
  }

  async deleteById(id: number): Promise<void> {
    await this.throwExceptionIfNotExistById(id);
    return this.postRepository.deleteById(id);
  }

  async uploadImage(
    imageFile: Express.Multer.File,
    postId: number,
  ): Promise<PostEntity> {
    await this.throwExceptionIfNotExistById(postId);
    let postEntity: PostEntity = await this.findById(postId);
    const fileIdForDelete: number = postEntity.imageId;
    postEntity.image = await this.fileService.create(imageFile);
    postEntity = await this.updateImage(postEntity.id, postEntity.image);
    if (fileIdForDelete) {
      await this.fileService.deleteById(fileIdForDelete);
    }
    return postEntity;
  }

  private async updateImage(
    postId: number,
    image: FileEntity,
  ): Promise<PostEntity> {
    return await this.postRepository.updateImage(postId, image);
  }

  async updateTags(postId: number, tags: TagEntity[]): Promise<PostEntity> {
    return await this.postRepository.updateTags(postId, tags);
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
