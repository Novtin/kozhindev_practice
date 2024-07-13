import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

@ValidatorConstraint({ name: 'isNicknameUniqueForUpdate', async: true })
@Injectable()
export class IsNicknameUniqueForUpdate implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(text: string, args: ValidationArguments): Promise<boolean> {
    const updateDto = args.object as any;
    const userWithSameNickname: UserEntity =
      await this.userService.findByNickname(text);
    return !(userWithSameNickname && userWithSameNickname.id !== updateDto.id);
  }

  defaultMessage(): string {
    return 'User already exist with same nickname and different id';
  }
}
