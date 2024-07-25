import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class FileSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор файла',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Название файла',
    required: true,
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    type: String,
    description: 'MIME тип файла',
    required: true,
  })
  @Expose()
  @Type(() => String)
  mimeType: string;

  @ApiProperty({
    type: Date,
    description: 'Дата создания файла',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
