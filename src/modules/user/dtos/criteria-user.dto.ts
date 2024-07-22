import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class CriteriaUserDto extends PaginationDto {
  @ApiProperty({
    type: String,
    description: 'Параметры запроса',
    required: false,
  })
  @IsOptional()
  @IsString()
  query?: string;
}
