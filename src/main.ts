import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseUsersExceptionFilter } from './filters/users-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new DatabaseUsersExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
