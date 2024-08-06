import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PostCommentDto {
  @ApiProperty({
    type: String,
    description: 'Текст комментария',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  text: string;
}
