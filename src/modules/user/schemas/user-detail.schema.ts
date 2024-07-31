import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileSchema } from '../../file/schemas/file.schema';
import { UserSchema } from './user.schema';

export class UserDetailSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор пользователя',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Имя',
    required: true,
  })
  @Expose()
  @Type(() => String)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    required: true,
  })
  @Expose()
  @Type(() => String)
  surname: string;

  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: true,
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Описание профиля',
    required: true,
  })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм пользователя',
    required: true,
  })
  @Expose()
  @Type(() => String)
  nickname: string;

  @ApiProperty({
    type: Date,
    description: 'Дата создания профиля',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата редактирования профиля',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    type: FileSchema,
    description: 'Аватар пользователя',
    required: true,
  })
  @Expose()
  @Type(() => FileSchema)
  avatar: FileSchema;

  @ApiProperty({
    type: UserSchema,
    isArray: true,
    description: 'Подписки пользователя',
    required: true,
  })
  @Expose()
  @Type(() => UserSchema)
  subscriptions: UserSchema[];
}
