import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { HashService } from './hash.service';
import { TokenService } from './token.service';
import { JwtDto, RefreshJwtDto } from './dto/jwt.dto';
import { Payload } from './payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<JwtDto> {
    if (await this.userService.existByEmail(loginDto.email)) {
      const user: UserEntity = await this.userService.findOneByEmail(
        loginDto.email,
      );
      if (
        await this.hashService.compareTextAndHash(
          loginDto.password,
          user.passwordHash,
        )
      ) {
        return await this.tokenService.makeTokens({
          email: user.email,
          id: user.id,
        });
      }
      throw new UnauthorizedException('Incorrect password');
    }
    throw new NotFoundException('User is not found');
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    if (
      !(await this.userService.existByEmail(registerDto.email)) &&
      !(await this.userService.existByNickname(registerDto.nickname))
    ) {
      registerDto.passwordHash = await this.hashService.makeHash(
        registerDto.passwordHash,
      );
      return await this.userService.create(registerDto);
    }
    throw new ConflictException('User already exists');
  }

  async refresh(refreshDto: RefreshJwtDto): Promise<JwtDto> {
    const payloadFromToken = await this.tokenService.verify(
      refreshDto.refreshToken,
    );
    if (!payloadFromToken) {
      throw new UnauthorizedException('JWT has expired');
    }
    const payload: Payload = {
      email: payloadFromToken.email,
      id: payloadFromToken.id,
    };
    return await this.tokenService.makeTokens(payload);
  }
}
