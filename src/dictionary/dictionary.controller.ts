import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) { }

  @Get('/english/definition/:word')
  async findDefinition(
    @Param('word') word: string

  ) {
    const data = await this.dictionaryService.findDefinitionOfWord(word);
    const response = {
      word: data[0].hwi.hw.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''),
      definition: data[0].shortdef[0],
      sound: data[0].hwi.prs[0].sound
    }
    return response;
  }

  @Get('/korean/definition/:word')
  async findDefinitionOfKoreanWord(
    @Param('word') word: string
  ) {
    const data = await this.dictionaryService.findDefinitionOfKoreanWord(word);
    return data
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
