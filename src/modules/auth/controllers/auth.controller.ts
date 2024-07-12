import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { RefreshJwtDto } from '../dtos/refresh-jwt.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../dtos/jwt.dto';
import { UserEntity } from '../../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: JwtDto,
  })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<JwtDto> {
    return this.authService.login(loginDto);
  }

  @ApiOkResponse({
    type: UserEntity,
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }

  @ApiOkResponse({
    type: JwtDto,
  })
  @Post('refresh')
  refresh(@Body() refreshDto: RefreshJwtDto): Promise<JwtDto> {
    return this.authService.refresh(refreshDto);
  }
}
