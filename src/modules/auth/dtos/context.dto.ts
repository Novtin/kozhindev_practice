import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ContextDto {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @IsInt()
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    type: String,
    description: 'Электронная почта пользователя',
    required: true,
  })
  @IsString()
  @Type(() => String)
  email: string;
}
