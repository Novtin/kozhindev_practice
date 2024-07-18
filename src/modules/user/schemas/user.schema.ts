import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt, IsString, Validate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UniqueUserEmailValidator } from '../validators/unique-user-email.validator';
import { UniqueUserNicknameValidator } from '../validators/unique-user-nickname.validator';

export class UserSchema {
  @ApiProperty({
    type: Number,
    description: 'Имя',
    required: true,
  })
  @Expose()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Имя',
    required: true,
  })
  @Expose()
  @IsString()
  @Type(() => String)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    required: true,
  })
  @Expose()
  @IsString()
  @Type(() => String)
  surname: string;

  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: true,
  })
  @Expose()
  @IsString()
  @IsEmail()
  @Validate(UniqueUserEmailValidator)
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Описание профиля',
    required: true,
  })
  @Expose()
  @IsString()
  @Type(() => String)
  description: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм пользователя',
    required: true,
  })
  @Expose()
  @IsString()
  @Validate(UniqueUserNicknameValidator)
  @Type(() => String)
  nickname: string;

  @ApiProperty({
    type: Date,
    description: 'Дата создания профиля',
    required: true,
  })
  @Expose()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата редактирования профиля',
    required: true,
  })
  @Expose()
  @IsString()
  @Type(() => Date)
  updatedAt: Date;
}
