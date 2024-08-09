import { CreatePostDto } from './create-post.dto';
import { ArrayNotEmpty, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagDto } from '../../tag/dtos/tag.dto';

export class CreatePostDetailDto extends CreatePostDto {
  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) => {
    const uniqueTags = Array.from(new Set(value));
    return uniqueTags
      .map((tag: string) => {
        if (tag) {
          return {
            name: tag,
          };
        }
      })
      .filter((tag) => !!tag);
  })
  tags: TagDto[];
}
