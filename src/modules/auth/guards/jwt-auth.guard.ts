import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { TokenService } from '../services/token.service';
import { Payload } from '../types/payload.type';

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
        // Токен приходит в виде 'Bearer <JWT>'
        req.headers.authorization.split(' ')[1],
      );
      if (payload) {
        const isUserExistsByEmail: boolean =
          await this.userService.existByEmail(payload.email);
        if (isUserExistsByEmail) {
          req.user = {
            userId: payload.userId,
            email: payload.email,
          };
          return true;
        }
      }
    }
    return false;
  }
}
