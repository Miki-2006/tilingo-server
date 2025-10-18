import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { CreateImageGenerationDto } from './dto/create-image-generation.dto';
import { UpdateImageGenerationDto } from './dto/update-image-generation.dto';
import { CreateVideoGenerationDto } from './dto/create-video-generation.dto';

@Controller('image-generation')
export class ImageGenerationController {
  constructor(private readonly imageGenerationService: ImageGenerationService) {}

  @Post('/new')
  createNewImage(@Body() createImageGenerationDto: CreateImageGenerationDto) {
    return this.imageGenerationService.create(createImageGenerationDto);
  }

  // @Post('/video')
  // createNewVideo(@Body() createVideoGenerationDto: CreateVideoGenerationDto) {
  //   return this.imageGenerationService.createVideo(createVideoGenerationDto);
  // }
  // @Get()
  // findAll() {
  //   return this.imageGenerationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imageGenerationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageGenerationDto: UpdateImageGenerationDto) {
  //   return this.imageGenerationService.update(+id, updateImageGenerationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imageGenerationService.remove(+id);
  // }
}
