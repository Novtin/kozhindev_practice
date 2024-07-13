import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'isIdExist', async: false })
@Injectable()
export class IsIdExist implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(text: string): Promise<boolean> {
    try {
      return await this.userService.existById(+text);
    } catch (error: unknown) {
      return false;
    }
  }

  defaultMessage(): string {
    return 'There is no user with this id';
  }
}
