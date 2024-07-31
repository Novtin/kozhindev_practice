import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { UserSchema } from '../../user/schemas/user.schema';
import { FileSchema } from '../../file/schemas/file.schema';
import { TagSchema } from '../../tag/schemas/tag.schema';

export class PostSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор поста',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Заголовок',
    required: true,
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Основной текст',
    required: true,
  })
  @Expose()
  @Type(() => String)
  text: string;

  @ApiProperty({
    type: Number,
    description: 'Количество лайков',
    required: true,
  })
  @Expose({ name: 'likes' })
  @Type(() => Number)
  @Transform(({ value }) => value.length)
  likesCount: number;

  @ApiProperty({
    type: UserSchema,
    description: 'Пользователь, чей пост',
    required: true,
  })
  @Expose()
  @Type(() => UserSchema)
  user: UserSchema;

  @ApiProperty({
    type: FileSchema,
    description: 'Картинка поста',
    required: true,
  })
  @Expose()
  @Type(() => FileSchema)
  image: FileSchema;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Теги поста',
    required: true,
  })
  @Transform(({ value }) => value.map((tag: TagSchema) => tag.name))
  @Type(() => TagSchema)
  @Expose({ name: 'tags' })
  tags: string[];

  @ApiProperty({
    type: Date,
    description: 'Дата создания поста',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата редактирования поста',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
