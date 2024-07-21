import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ContextDto {
  @ApiProperty({
    type: String,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @IsString()
  @Type(() => String)
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
