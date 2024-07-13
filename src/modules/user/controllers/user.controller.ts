import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateDto } from '../dto/update.dto';
import { IdDto } from '../dto/id.dto';

@ApiTags('user')
@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserEntity,
  })
  @Get(':id')
  findById(@Param() idDto: IdDto): Promise<UserEntity> {
    return this.userService.findById(idDto.id);
  }

  @ApiOkResponse({
    type: [UserEntity],
  })
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    type: UserEntity,
  })
  @Patch()
  update(@Body() updateDto: UpdateDto): Promise<UserEntity> {
    return this.userService.update(updateDto);
  }

  @ApiOkResponse({
    type: undefined,
  })
  @Delete(':id')
  deleteById(@Param() idDto: IdDto): Promise<void> {
    return this.userService.deleteById(idDto.id);
  }
}
