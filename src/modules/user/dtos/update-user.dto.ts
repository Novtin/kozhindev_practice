import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UniqueUserEmailForUpdateValidator } from '../validators/unique-user-email-for-update.validator';
import { UniqueUserNicknameForUpdateValidator } from '../validators/unique-user-nickname-for-update.validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'Идентификатор пользователя',
    required: true,
  })
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
  @Validate(UniqueUserEmailForUpdateValidator)
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
  @Validate(UniqueUserNicknameForUpdateValidator)
  @Type(() => String)
  nickname?: string;
}
