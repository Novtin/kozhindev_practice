import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Validate } from 'class-validator';
import { IsIdExist } from '../constraints/is-id-exist';
import { Type } from 'class-transformer';

export class IdDto {
  @ApiProperty({
    type: String,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @Validate(IsIdExist)
  @Type(() => Number)
  @IsNumber()
  id: number;
}
