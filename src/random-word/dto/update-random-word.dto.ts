import { PartialType } from '@nestjs/mapped-types';
import { CreateRandomWordDto } from './create-random-word.dto';

export class UpdateRandomWordDto extends PartialType(CreateRandomWordDto) {}
