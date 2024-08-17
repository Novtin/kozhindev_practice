import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostDetailSchema } from '../schemas/post-detail.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';
import { PostCommentDto } from '../dtos/post-comment.dto';
import { Context } from '../../auth/decorators/context.decorator';
import { ContextDto } from '../../auth/dtos/context.dto';
import { PostEntity } from '../entities/post.entity';
import { CreatePostComment } from '../types/create-post-comment.type';
import { PostCommentEntity } from '../entities/post-comment.entity';
import { IdsPostComment } from '../types/ids-post-comment.type';
import { PostCommentService } from '../services/post-comment.service';

@ApiTags('comment')
@Controller('post')
export class PostCommentController {
  constructor(
    private readonly postService: PostService,
    private readonly postCommentService: PostCommentService,
  ) {}
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
    return this.postService.findByIdDetail(commentEntity.postId);
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
    await this.checkPermission(commentId, context.userId);
    const comment: IdsPostComment = {
      id: commentId,
      postId,
      userId: context.userId,
    };
    await this.postCommentService.throwExceptionIfNotExist(comment);
    await this.postCommentService.deleteById(commentId);
    return this.postService.findByIdDetail(postId);
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
    await this.checkPermission(commentId, context.userId);
    const comment: IdsPostComment = {
      id: commentId,
      postId,
      userId: context.userId,
    };
    await this.postCommentService.throwExceptionIfNotExist(comment);
    const commentEntity: PostCommentEntity =
      await this.postCommentService.update(commentId, commentDto.text);
    return this.postService.findByIdDetail(commentEntity.postId);
  }

  async checkPermission(commentId: number, userId: number): Promise<void> {
    if ((await this.postCommentService.findById(commentId)).userId !== userId) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
