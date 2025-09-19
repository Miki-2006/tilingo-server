import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseUsersExceptionFilter } from './common/filters/users-exception.filter';
import { DictionaryApiExceptionFilter } from './common/filters/dictionary-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new DatabaseUsersExceptionFilter, new DictionaryApiExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
