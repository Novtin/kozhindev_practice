import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagService } from './services/tag.service';
import { TagRepository } from './repositories/tag.repository';
import { TagController } from './controllers/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService, TagRepository],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
