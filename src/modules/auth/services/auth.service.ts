import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { HashService } from './hash.service';
import { TokenService } from './token.service';
import { JwtDto } from '../dtos/jwt.dto';
import { Payload } from '../types/payload.type';
import { RefreshJwtDto } from '../dtos/refresh-jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<JwtDto> {
    const isUserExistsByEmail: boolean = await this.userService.existByEmail(
      loginDto.email,
    );
    if (!isUserExistsByEmail) {
      throw new NotFoundException('User is not found');
    }
    const user: UserEntity = await this.userService.findOneByEmail(
      loginDto.email,
    );

    const isPasswordValid: boolean = await this.hashService.compareTextAndHash(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect password');
    }

    return await this.tokenService.makeTokens({
      email: user.email,
      id: user.id,
    });
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    registerDto.passwordHash = await this.hashService.makeHash(
      registerDto.passwordHash,
    );
    return await this.userService.create(registerDto);
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
