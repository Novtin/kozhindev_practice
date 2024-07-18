import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FileDto {
  @ApiProperty({
    type: String,
    description: 'Название файла',
    required: true,
  })
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'MIME тип файла',
    required: true,
  })
  @Type(() => String)
  @IsString()
  mimeType: string;
}
