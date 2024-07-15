import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'uniqueUserEmailValidator', async: true })
@Injectable()
export class UniqueUserEmailValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(text: string): Promise<boolean> {
    const isUserExistsByEmail: boolean =
      await this.userService.existByEmail(text);
    return !isUserExistsByEmail;
  }

  defaultMessage(): string {
    return 'User already exist by email';
  }
}
