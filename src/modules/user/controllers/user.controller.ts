import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Get,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
  ForbiddenException,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Context } from '../../auth/decorators/context.decorator';
import { Payload } from '../../auth/types/payload.type';
import { FindAllUserDto } from '../dtos/find-all-user.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { UserSchema } from '../schemas/user.schema';

@ApiTags('user')
@Controller('user')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserSchema,
  })
  @UseInterceptors(new TransformInterceptor(UserSchema))
  @Get(':id')
  findById(@Param('id', ParseIntPipe) userId: number): Promise<UserEntity> {
    return this.userService.findById(userId);
  }

  @ApiOkResponse({
    type: UserSchema,
    isArray: true,
  })
  @UseInterceptors(new TransformInterceptor(UserSchema))
  @Get()
  findAll(@Query() findAllUserDto: FindAllUserDto): Promise<UserEntity[]> {
    return this.userService.findAll(findAllUserDto);
  }

  @ApiOkResponse({
    type: UserSchema,
  })
  @UseInterceptors(new TransformInterceptor(UserSchema))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @Context() userFromToken: Payload,
  ): Promise<UserEntity> {
    if (userId !== updateUserDto.id) {
      throw new BadRequestException();
    }
    this.checkPermission(updateUserDto.id, userFromToken.id);
    return this.userService.update(updateUserDto);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) userId: number,
    @Context() userFromToken: Payload,
  ): Promise<void> {
    this.checkPermission(userId, userFromToken.id);
    return this.userService.deleteById(userId);
  }

  checkPermission(idFromDto: number, idFromToken: number): void {
    if (idFromDto !== idFromToken) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
