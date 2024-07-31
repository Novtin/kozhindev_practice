import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    name: 'name',
    description: 'Название тега',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;
}
