import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

@ValidatorConstraint({ name: 'uniqueUserEmailForUpdateValidator', async: true })
@Injectable()
export class UniqueUserEmailForUpdateValidator
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UserService) {}

  async validate(text: string, args: ValidationArguments): Promise<boolean> {
    const updateDto = args.object as any;
    const userWithSameEmail: UserEntity =
      await this.userService.findByEmail(text);
    return !(userWithSameEmail && userWithSameEmail.id !== updateDto.id);
  }

  defaultMessage(): string {
    return 'User already exist with same email and different id';
  }
}
