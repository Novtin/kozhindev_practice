import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Validate } from 'class-validator';

import { Type } from 'class-transformer';
import { UserIdExistValidator } from '../validators/user-id-exist.validator';

export class IdUserDto {
  @ApiProperty({
    type: String,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @Validate(UserIdExistValidator)
  @Type(() => Number)
  @IsNumber()
  id: number;
}
