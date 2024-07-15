import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'userEmailExistValidator', async: false })
@Injectable()
export class UserEmailExistValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(text: string): Promise<boolean> {
    return await this.userService.existByEmail(text);
  }

  defaultMessage(): string {
    return 'There is no user with this email';
  }
}
