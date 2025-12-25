import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseUsersExceptionFilter } from './common/filters/users-exception.filter';
import { DictionaryApiExceptionFilter } from './common/filters/dictionary-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new DatabaseUsersExceptionFilter, new DictionaryApiExceptionFilter)
  app.enableCors({
    origin: ['http://localhost:3001','http://localhost:3000', 'https://method15.vercel.app/', 'https://yourfrontend.com'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with cross-origin requests
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
