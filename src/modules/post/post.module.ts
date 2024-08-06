import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostRepository } from './repositories/post.repository';
import { PostController } from './controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PostLikeRepository } from './repositories/post-like.repository';
import { PostLikeService } from './services/post-like.service';
import { PostLikeEntity } from './entities/post-like.entity';
import { FileModule } from '../file/file.module';
import { TagModule } from '../tag/tag.module';
import { PostCommentService } from './services/post-comment.service';
import { PostCommentRepository } from './repositories/post-comment.repository';
import { PostCommentEntity } from './entities/post-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostLikeEntity, PostCommentEntity]),
    UserModule,
    AuthModule,
    FileModule,
    TagModule,
  ],
  providers: [
    PostRepository,
    PostService,
    PostLikeRepository,
    PostLikeService,
    PostCommentService,
    PostCommentRepository,
  ],
  controllers: [PostController],
})
export class PostModule {}
