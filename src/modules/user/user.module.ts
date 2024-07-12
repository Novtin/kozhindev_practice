import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IsUserAlreadyExistByNickname } from './constraints/is-user-already-exist-by-nickname.constraint';
import { IsUserAlreadyExistByEmail } from './constraints/is-user-already-exist-by-email.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserRepository,
    IsUserAlreadyExistByNickname,
    IsUserAlreadyExistByEmail,
  ],
  exports: [
    UserService,
    IsUserAlreadyExistByNickname,
    IsUserAlreadyExistByEmail,
  ],
})
export class UserModule {}
