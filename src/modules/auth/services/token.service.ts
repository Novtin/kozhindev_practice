import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from '../dtos/jwt.dto';
import { Payload } from '../types/payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async makeTokens(payload: Payload): Promise<JwtDto> {
    const accessToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.accessSecret'),
      algorithm: this.configService.get('jwt.algorithm'),
      expiresIn: this.configService.get('jwt.accessExp'),
    });

    const refreshToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      algorithm: this.configService.get('jwt.algorithm'),
      expiresIn: this.configService.get('jwt.refreshExp'),
    });

    return { accessToken, refreshToken };
  }

  async verify(refreshToken: string): Promise<Payload> {
    let payload: Payload = null;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt.refreshSecret'),
        algorithms: this.configService.get('jwt.algorithm'),
      });
    } catch (error: unknown) {}
    return payload;
  }
}
