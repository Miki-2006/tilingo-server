import { Module } from '@nestjs/common';
import { RandomWordService } from './random-word.service';
import { RandomWordController } from './random-word.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule.forFeature(() => ({}))],
  controllers: [RandomWordController],
  providers: [RandomWordService],
})
export class RandomWordModule {}
