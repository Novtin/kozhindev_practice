import { UserEntity } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UserSchema extends OmitType(UserEntity, [
  'passwordHash',
] as const) {}
