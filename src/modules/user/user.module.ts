import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UniqueUserNicknameValidator } from './validators/unique-user-nickname.validator';
import { UniqueUserEmailValidator } from './validators/unique-user-email.validator';
import { UserController } from './controllers/user.controller';
import { IsEmailUniqueForUpdate } from './constraints/is-email-unique-for-update';
import { IsNicknameUniqueForUpdate } from './constraints/is-nickname-unique-for-update';
import { IsIdExist } from './constraints/is-id-exist';
import { IsEmailExist } from './constraints/is-email-exist';
import { HashService } from './services/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserRepository,
    UniqueUserNicknameValidator,
    UniqueUserEmailValidator,
    IsEmailUniqueForUpdate,
    IsNicknameUniqueForUpdate,
    IsIdExist,
    IsEmailExist,
    HashService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UniqueUserNicknameValidator, UniqueUserEmailValidator,
    HashService,
  ],
})
export class UserModule {}
