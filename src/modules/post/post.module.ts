import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostRepository } from './repositories/post.repository';
import { PostController } from './controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule, AuthModule],
  providers: [PostRepository, PostService],
  controllers: [PostController],
})
export class PostModule {}
