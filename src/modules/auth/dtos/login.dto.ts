import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEmailExist } from '../../user/constraints/is-email-exist';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: true,
  })
  @Validate(IsEmailExist)
  @IsString()
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    required: true,
  })
  @IsString()
  @Type(() => String)
  password: string;
}
