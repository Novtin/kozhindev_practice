import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsUserAlreadyExistByEmail } from '../../user/constraints/is-user-already-exist-by-email.constraint';
import { IsUserAlreadyExistByNickname } from '../../user/constraints/is-user-already-exist-by-nickname.constraint';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'Имя',
    required: true,
  })
  @IsString()
  @Type(() => String)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    required: true,
  })
  @IsString()
  @Type(() => String)
  surname: string;

  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: true,
  })
  @IsString()
  @IsEmail()
  @Validate(IsUserAlreadyExistByEmail)
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    required: true,
  })
  @IsString()
  @Type(() => String)
  passwordHash: string;

  @ApiProperty({
    type: String,
    description: 'Описание профиля',
    required: true,
  })
  @IsString()
  @Type(() => String)
  description: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм пользователя',
    required: true,
  })
  @IsString()
  @Validate(IsUserAlreadyExistByNickname)
  @Type(() => String)
  nickname: string;

  // Будущая реализация
  // @ApiProperty({
  //   type: String,
  //   description: 'Фотография пользователя',
  //   required: false,
  // })
  // @IsInt()
  // @IsOptional()
  // @Type(() => Number)
  // photo?: number;
}
