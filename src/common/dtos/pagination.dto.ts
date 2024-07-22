import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
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
