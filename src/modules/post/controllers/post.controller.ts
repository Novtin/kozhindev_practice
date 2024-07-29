import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';
import { PostService } from '../services/post.service';
import { PostEntity } from '../entities/post.entity';
import { PostSchema } from '../schemas/post.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Context } from '../../auth/decorators/context.decorator';
import { ContextDto } from '../../auth/dtos/context.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';

@ApiTags('post')
@Controller('post')
@UsePipes(new ValidationPipe({ transform: true }))
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
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
  create(
    @Body() createPostDto: CreatePostDto,
    @Context() context: ContextDto,
  ): Promise<PostEntity> {
    createPostDto.userId = context.userId;
    return this.postService.create(createPostDto);
  }

  async checkPermission(postId: number, userId: number): Promise<void> {
    if ((await this.postService.findById(postId)).userId !== userId) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
