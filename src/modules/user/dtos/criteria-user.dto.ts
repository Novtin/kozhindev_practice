import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CriteriaUserDto {
  @ApiProperty({
    type: String,
    description: 'Параметры запроса',
    required: false,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    type: Number,
    description: 'Страница',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page?: number;

  @ApiProperty({
    type: Number,
    description: 'Лимит',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit?: number;
}
