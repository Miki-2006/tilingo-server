import { PartialType } from '@nestjs/mapped-types';
import { CreateImageGenerationDto } from './create-image-generation.dto';

export class UpdateImageGenerationDto extends PartialType(CreateImageGenerationDto) {}
