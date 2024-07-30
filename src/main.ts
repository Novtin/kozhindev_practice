import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const config = app.get(ConfigService);
  const configSwagger = new DocumentBuilder()
    .setTitle(`Backend Mini Twitter`)
    .setDescription('API Documentation')
    .addServer(
      `http://${config.get<string>('http.host')}:${config.get<string>('http.port')}/api`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(`/docs`, app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(config.get<string>('http.port'));
}
bootstrap();
