import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['userId']),
) {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор поста',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
