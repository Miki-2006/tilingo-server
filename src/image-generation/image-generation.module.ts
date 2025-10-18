import { Module } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { ImageGenerationController } from './image-generation.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ImageGenerationController],
  providers: [ImageGenerationService],
})
export class ImageGenerationModule {}
