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
import { CreatePostDetailDto } from '../dtos/create-post-detail.dto';
import { CreatePostComment } from '../types/create-post-comment';
import { PostCommentService } from '../services/post-comment.service';
import { PostCommentEntity } from '../entities/post-comment.entity';
import { PostDetailSchema } from '../schemas/post-detail.schema';
import { IdsPostComment } from '../types/ids-post-comment';
import { PostCommentDto } from '../dtos/post-comment.dto';
import { PostLike } from '../types/post-like';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postLikeService: PostLikeService,
    private readonly postCommentService: PostCommentService,
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
    type: PostDetailSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostDetailSchema))
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
    await this.checkPermissionForPost(postId, context.userId);
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
    await this.checkPermissionForPost(postId, context.userId);
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
    return this.postService.createDetail(createPostDetailDto);
  }

  @ApiOkResponse({
    type: PostDetailSchema,
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
    new TransformInterceptor(PostDetailSchema),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) postId: number,
    @UploadedFile() imageFile: Express.Multer.File,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    if (!imageFile) {
      throw new BadRequestException('File image is missing');
    }
    await this.checkPermissionForPost(postId, context.userId);
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
    const like: PostLike = { userId: context.userId, postId };
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
    const like: PostLike = { userId: context.userId, postId };
    await this.postLikeService.removeLike(like);
    return this.postService.findByIdWithRelations(postId);
  }

  @ApiOkResponse({
    type: PostDetailSchema,
  })
  @Post('/:postId/comment')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(PostDetailSchema))
  async addComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() commentDto: PostCommentDto,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    await this.postService.throwExceptionIfNotExistById(postId);
    const comment: CreatePostComment = {
      text: commentDto.text,
      postId,
      userId: context.userId,
    };
    const commentEntity: PostCommentEntity =
      await this.postCommentService.create(comment);
    return this.postService.findByIdWithRelations(commentEntity.postId);
  }

  @ApiOkResponse()
  @Delete('/:postId/comment/:commentId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(PostDetailSchema))
  async removeComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    await this.postService.throwExceptionIfNotExistById(postId);
    await this.checkPermissionForPostComment(commentId, context.userId);
    const comment: IdsPostComment = {
      id: commentId,
      postId,
      userId: context.userId,
    };
    await this.postCommentService.throwExceptionIfNotExist(comment);
    await this.postCommentService.deleteById(commentId);
    return this.postService.findByIdWithRelations(postId);
  }

  @ApiOkResponse({
    type: PostDetailSchema,
  })
  @UseInterceptors(new TransformInterceptor(PostDetailSchema))
  @UseGuards(JwtAuthGuard)
  @Patch('/:postId/comment/:commentId')
  async updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() commentDto: PostCommentDto,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    await this.postService.throwExceptionIfNotExistById(postId);
    await this.checkPermissionForPostComment(commentId, context.userId);
    const comment: IdsPostComment = {
      id: commentId,
      postId,
      userId: context.userId,
    };
    await this.postCommentService.throwExceptionIfNotExist(comment);
    const commentEntity: PostCommentEntity =
      await this.postCommentService.update(commentId, commentDto.text);
    return this.postService.findByIdWithRelations(commentEntity.postId);
  }

  async checkPermissionForPost(postId: number, userId: number): Promise<void> {
    if ((await this.postService.findById(postId)).userId !== userId) {
      throw new ForbiddenException('Forbidden resource');
    }
  }

  async checkPermissionForPostComment(
    commentId: number,
    userId: number,
  ): Promise<void> {
    if ((await this.postCommentService.findById(commentId)).userId !== userId) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
