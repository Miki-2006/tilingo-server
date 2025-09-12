import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) { }

  @Get('/definition/:word')
  findDefinition(
    @Param('word') word: string

  ) {
    return this.dictionaryService.findDefinitionOfWord(word);
  }

  // @Post()
  // create(@Body() createDictionaryDto: CreateDictionaryDto) {
  //   return this.dictionaryService.create(createDictionaryDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dictionaryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto) {
  //   return this.dictionaryService.update(+id, updateDictionaryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dictionaryService.remove(+id);
  // }
}
