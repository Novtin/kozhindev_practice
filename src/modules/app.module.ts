import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../config/typeorm.config';
import jwtConfig from '../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import httpConfig from '../config/http.config';
import { FileModule } from './file/file.module';
import fileConfig from '../config/file.config';
import paginationConfig from '../config/pagination.config';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        typeOrmConfig,
        jwtConfig,
        httpConfig,
        paginationConfig,
        fileConfig,
      ],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UserModule,
    FileModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
