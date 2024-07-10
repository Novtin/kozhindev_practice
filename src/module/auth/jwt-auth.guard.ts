import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from './token.service';
import { Payload } from './payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers.authorization) {
      const payload: Payload = await this.tokenService.verify(
        req.headers.authorization,
      );
      if (payload) {
        if (await this.userService.existByEmail(payload.email)) {
          return true;
        }
      }
    }
    return false;
  }
}
