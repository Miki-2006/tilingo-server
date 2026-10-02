import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.service';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
