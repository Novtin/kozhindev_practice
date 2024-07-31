import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class TagSchema {
  @ApiProperty({
    type: Number,
    description: 'Идентификатор тега',
    required: true,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    description: 'Название тега',
    required: true,
  })
  @Expose()
  @Type(() => String)
  name: string;
}
