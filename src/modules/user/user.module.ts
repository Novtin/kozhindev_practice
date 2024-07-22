import { forwardRef, Module } from '@nestjs/common';
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
import { AuthModule } from '../auth/auth.module';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    FileModule,
  ],
  providers: [
    UserService,
    UserRepository,
    UniqueUserNicknameValidator,
    UniqueUserEmailValidator,
    UniqueUserEmailForUpdateValidator,
    UniqueUserNicknameForUpdateValidator,
    HashService,
    TransformInterceptor,
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
