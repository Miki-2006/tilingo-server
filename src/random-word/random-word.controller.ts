import { Controller, Get, Param } from '@nestjs/common';
import { RandomWordService } from './random-word.service';

@Controller('random-word')
export class RandomWordController {
  constructor(private readonly randomWordService: RandomWordService) {}

  @Get('/:word')
  async getDefinitionOfRandomWord(
    @Param('word') word: string
  ){
    return this.randomWordService.getDefinition(word)
  }
}
