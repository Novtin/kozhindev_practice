import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEmailExistValidator } from '../../user/validators/user-email-exist.validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: true,
  })
  @Validate(UserEmailExistValidator)
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
