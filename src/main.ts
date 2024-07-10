import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptors } from './interceptors/log.interceptors';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LogInterceptors);

  await app.listen(3000);

};
bootstrap();
