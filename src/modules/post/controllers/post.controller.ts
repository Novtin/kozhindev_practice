import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';
import { PostService } from '../services/post.service';
import { PostEntity } from '../entities/post.entity';
import { PostSchema } from '../schemas/post.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Context } from '../../auth/decorators/context.decorator';
import { ContextDto } from '../../auth/dtos/context.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageOptions } from '../../../config/multer-image.config';
import { PostLikeService } from '../services/post-like.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { TagDto } from '../../tag/dtos/tag.dto';
import { TagService } from '../../tag/services/tag.service';
import { TagEntity } from '../../tag/entities/tag.entity';
import { CreatePostDetailDto } from '../dtos/create-post-detail.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postLikeService: PostLikeService,
    private readonly tagService: TagService,
  ) {}

  @ApiOkResponse({
    type: PostSchema,
  })
  @Get('my-subscription')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(PostSchema))
  findFromSubscriptions(@Context() context: ContextDto): Promise<PostEntity[]> {
    return this.postService.findFromSubscriptions(context.userId);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostSchema))
  @Get(':id')
  findById(@Param('id', ParseIntPipe) postId: number): Promise<PostEntity> {
    return this.postService.findByIdWithRelations(postId);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostSchema))
  @Get()
  findByCriteria(@Query() paginationDto: PaginationDto): Promise<PostEntity[]> {
    return this.postService.findByCriteria(paginationDto);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) postId: number,
    @Context() context: ContextDto,
  ): Promise<void> {
    await this.checkPermission(postId, context.userId);
    return this.postService.deleteById(postId);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostSchema))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    updatePostDto.id = postId;
    await this.checkPermission(postId, context.userId);
    return this.postService.update(updatePostDto);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostSchema))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDetailDto: CreatePostDetailDto,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    createPostDetailDto.userId = context.userId;
    const postEntity: PostEntity =
      await this.postService.create(createPostDetailDto);
    postEntity.tags = await Promise.all(
      createPostDetailDto.tags.map(
        async (tagDto: TagDto): Promise<TagEntity> =>
          await this.tagService.createIfNotExist(tagDto),
      ),
    );
    return this.postService.updateTags(postEntity.id, postEntity.tags);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        imageFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/:id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('imageFile', multerImageOptions),
    new TransformInterceptor(PostSchema),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) postId: number,
    @UploadedFile() imageFile: Express.Multer.File,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    if (!imageFile) {
      throw new BadRequestException('File image is missing');
    }
    await this.checkPermission(postId, context.userId);
    return this.postService.uploadImage(imageFile, postId);
  }

  @ApiOkResponse({
    type: PostSchema,
  })
  @Post('/:id/like')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(PostSchema))
  async setLike(
    @Param('id', ParseIntPipe) postId: number,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    await this.postService.throwExceptionIfNotExistById(postId);
    const like: Like = { userId: context.userId, postId };
    await this.postLikeService.setLike(like);
    return this.postService.findByIdWithRelations(postId);
  }

  @ApiOkResponse()
  @Delete('/:id/like')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(PostSchema))
  async removeLike(
    @Param('id', ParseIntPipe) postId: number,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    await this.postService.throwExceptionIfNotExistById(postId);
    const like: Like = { userId: context.userId, postId };
    await this.postLikeService.removeLike(like);
    return this.postService.findByIdWithRelations(postId);
  }

  async checkPermission(postId: number, userId: number): Promise<void> {
    if ((await this.postService.findById(postId)).userId !== userId) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
