import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор пользователя, кто создаёт пост',
    required: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @ApiProperty({
    type: String,
    description: 'Заголовок',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Основной текст',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  text: string;
}
