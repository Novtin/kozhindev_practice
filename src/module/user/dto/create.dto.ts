import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
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
  @Type(() => String)
  nickname: string;

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
