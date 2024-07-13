import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEmailUniqueForUpdate } from '../constraints/is-email-unique-for-update';
import { IsNicknameUniqueForUpdate } from '../constraints/is-nickname-unique-for-update';
import { IsIdExist } from '../constraints/is-id-exist';

export class UpdateDto {
  @ApiProperty({
    type: String,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @Validate(IsIdExist)
  @Type(() => Number)
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Имя',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  surname?: string;

  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  @Validate(IsEmailUniqueForUpdate)
  @Type(() => String)
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  passwordHash?: string;

  @ApiProperty({
    type: String,
    description: 'Описание профиля',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Validate(IsNicknameUniqueForUpdate)
  @Type(() => String)
  nickname?: string;

  // Будущая реализация
  // @ApiProperty({
  //   type: String,
  //   description: 'Фотография пользователя',
  //   required: false,
  // })
  // @IsString()
  // @IsOptional()
  // @Type(() => Number)
  // photo?: number;
}
