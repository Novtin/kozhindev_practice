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

import { UpdateUserDto } from '../dtos/update-user.dto';
import { IdUserDto } from '../dtos/id-user.dto';

@ApiTags('user')
@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserEntity,
  })
  @Get(':id')
  findById(@Param() idUserDto: IdUserDto): Promise<UserEntity> {
    return this.userService.findById(idUserDto.id);
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
  update(@Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userService.update(updateUserDto);
  }

  @ApiOkResponse({
    type: undefined,
  })
  @Delete(':id')
  deleteById(@Param() idUserDto: IdUserDto): Promise<void> {
    return this.userService.deleteById(idUserDto.id);
  }
}
