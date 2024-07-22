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
  ForbiddenException,
  Query,
  UseInterceptors,
  Post,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Context } from '../../auth/decorators/context.decorator';
import { CriteriaUserDto } from '../dtos/criteria-user.dto';
import { TransformInterceptor } from '../../../common/interceptors/transform.interceptor';
import { UserSchema } from '../schemas/user.schema';
import { ContextDto } from '../../auth/dtos/context.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer.config';

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
  findByCriteria(
    @Query() criteriaUserDto: CriteriaUserDto,
  ): Promise<UserEntity[]> {
    return this.userService.findByCriteria(criteriaUserDto);
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
    @Context() context: ContextDto,
  ): Promise<UserEntity> {
    updateUserDto.id = userId;
    this.checkPermission(updateUserDto.id, context.userId);
    return this.userService.update(updateUserDto);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) userId: number,
    @Context() context: ContextDto,
  ): Promise<void> {
    this.checkPermission(userId, context.userId);
    return this.userService.deleteById(userId);
  }

  @ApiOkResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', multerOptions),
    new TransformInterceptor(UserSchema),
  )
  uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Context() context: ContextDto,
  ): Promise<UserEntity> {
    if (!avatar) {
      throw new BadRequestException('File avatar is missing');
    }
    return this.userService.uploadAvatar(avatar, context.userId);
  }

  checkPermission(idFromDto: number, idFromContext: number): void {
    if (idFromDto !== idFromContext) {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}
