import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserSchema } from '../../user/schemas/user.schema';

export class PostCommentSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор комментария',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Текст комментария',
    required: true,
  })
  @Expose()
  @Type(() => String)
  text: string;

  @ApiProperty({
    type: UserSchema,
    description: 'Пользователь, чей комментарий',
    required: true,
  })
  @Expose()
  @Type(() => UserSchema)
  user: UserSchema;

  @ApiProperty({
    type: Date,
    description: 'Дата создания комментария',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата редактирования комментария',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
