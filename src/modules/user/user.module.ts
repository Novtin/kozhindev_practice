import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UniqueUserNicknameValidator } from './validators/unique-user-nickname.validator';
import { UniqueUserEmailValidator } from './validators/unique-user-email.validator';
import { UserController } from './controllers/user.controller';
import { HashService } from './services/hash.service';
import { UniqueUserEmailForUpdateValidator } from './validators/unique-user-email-for-update.validator';
import { UniqueUserNicknameForUpdateValidator } from './validators/unique-user-nickname-for-update.validator';
import { UserIdExistValidator } from './validators/user-id-exist.validator';
import { UserEmailExistValidator } from './validators/user-email-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserRepository,
    UniqueUserNicknameValidator,
    UniqueUserEmailValidator,
    UniqueUserEmailForUpdateValidator,
    UniqueUserNicknameForUpdateValidator,
    UserIdExistValidator,
    UserEmailExistValidator,
    HashService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UniqueUserNicknameValidator,
    UniqueUserEmailValidator,
    HashService,
  ],
})
export class UserModule {}
