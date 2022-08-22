import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serve, setup } from 'swagger-ui-express';
import * as doc from './document/doc.json';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use('/api', serve, setup(doc));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
