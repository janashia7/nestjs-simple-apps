import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serve, setup } from 'swagger-ui-express';
import * as doc from './document/doc.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use('/api', serve, setup(doc));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
