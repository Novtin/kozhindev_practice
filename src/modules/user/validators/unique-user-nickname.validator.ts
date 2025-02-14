import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'uniqueUserNicknameValidator', async: true })
@Injectable()
export class UniqueUserNicknameValidator
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UserService) {}

  async validate(text: string): Promise<boolean> {
    const isUserExistsByNickname: boolean =
      await this.userService.existByNickname(text);
    return !isUserExistsByNickname;
  }

  defaultMessage(): string {
    return 'User already exist by nickname';
  }
}
