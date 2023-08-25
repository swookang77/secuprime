import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/',express.static(path.join(__dirname,'../frontend/build')))
  await app.listen(80);
}
bootstrap();
