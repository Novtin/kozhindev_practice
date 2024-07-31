import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TagDto } from '../dtos/tag.dto';
import { TagEntity } from '../entities/tag.entity';
import { TagSchema } from '../schemas/tag.schema';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({
    type: TagSchema,
  })
  @UseInterceptors(new TransformInterceptor(TagSchema))
  @Get('search')
  findByName(@Query() findByNameDto: TagDto): Promise<TagEntity> {
    return this.tagService.findByName(findByNameDto.name);
  }
}
