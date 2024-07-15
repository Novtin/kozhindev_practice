import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UniqueUserNicknameValidator } from './validators/unique-user-nickname.validator';
import { UniqueUserEmailValidator } from './validators/unique-user-email.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserRepository,
    UniqueUserNicknameValidator,
    UniqueUserEmailValidator,
  ],
  exports: [UserService, UniqueUserNicknameValidator, UniqueUserEmailValidator],
})
export class UserModule {}
