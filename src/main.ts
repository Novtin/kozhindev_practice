import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const configSwagger = new DocumentBuilder()
    .setTitle(`Backend Mini Twitter`)
    .setDescription('API Documentation')
    .addServer(`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/api`)
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(`/api/docs`, app, document);

  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
