import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { HashService } from './hash.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, JwtModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, HashService, TokenService],
})
export class AuthModule {}
