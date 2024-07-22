import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from '../services/file.service';
import { FileEntity } from '../entities/file.entity';
import { FileSchema } from '../schemas/file.schema';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';

@ApiTags('file')
@Controller('file')
@UsePipes(ValidationPipe)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse({
    type: FileSchema,
  })
  @UseInterceptors(new TransformInterceptor(FileSchema))
  @Get(':id')
  findById(@Param('id', ParseIntPipe) fileId: number): Promise<FileEntity> {
    return this.fileService.findById(fileId);
  }
}
