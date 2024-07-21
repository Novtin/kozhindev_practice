import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class FileSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор файла',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  @IsInt()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Название файла',
    required: true,
  })
  @Expose()
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'MIME тип файла',
    required: true,
  })
  @Expose()
  @Type(() => String)
  @IsString()
  mimeType: string;

  @ApiProperty({
    type: Date,
    description: 'Дата создания файла',
    required: true,
  })
  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}
