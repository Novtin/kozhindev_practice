import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FileDto {
  @ApiProperty({
    type: String,
    description: 'Название файла',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'MIME тип файла',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  mimeType: string;
}
