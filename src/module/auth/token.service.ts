import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';
import { Payload } from './payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async makeTokens(payload: Payload): Promise<JwtDto> {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      algorithm: this.configService.get('JWT_ALG'),
      expiresIn: this.configService.get('JWT_ACCESS_EXP'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      algorithm: this.configService.get('JWT_ALG'),
      expiresIn: this.configService.get('JWT_REFRESH_EXP'),
    });

    return { accessToken, refreshToken };
  }

  async verify(refreshToken: string): Promise<Payload> {
    let payload: Payload = null;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        algorithms: this.configService.get('JWT_ALG'),
      });
    } catch (error: unknown) {}
    return payload;
  }
}
