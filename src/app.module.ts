import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RandomWordModule } from './random-word/random-word.module';
import { ConfigModule } from '@nestjs/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';
import { WordsModule } from './words/words.module';
import { BooksModule } from './books/books.module';
import { ImageGenerationModule } from './image-generation/image-generation.module';

@Module({
  imports: [PrismaModule, RandomWordModule, ConfigModule.forRoot({isGlobal: true}), DictionaryModule, ModulesModule, UsersModule, WordsModule, BooksModule, ImageGenerationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
