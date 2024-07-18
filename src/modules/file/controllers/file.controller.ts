import {
  Controller,
  Get,
  Param, ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileEntity } from '../entities/file.entity';

@ApiTags('file')
@Controller('file')
@UsePipes(ValidationPipe)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse({
    type: FileEntity,
  })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) fileId: number): Promise<FileEntity> {
    return this.fileService.findById(fileId);
  }
}
