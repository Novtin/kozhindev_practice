import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RefreshJwtDto {
  @ApiProperty({
    type: String,
    description: 'Refresh токен',
    required: true,
  })
  @IsString()
  @Type(() => String)
  refreshToken: string;
}
