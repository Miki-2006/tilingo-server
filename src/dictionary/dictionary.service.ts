import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InvalidApiKeyError, WordNotFoundError } from '../common/errors/dictionary.errors';


@Injectable()
export class DictionaryService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async findDefinitionOfWord(word: string): Promise<any> {
    if (!process.env.MERRIAM_DICTIONARY_API_KEY) {
      throw new InvalidApiKeyError();
    }

    const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_DICTIONARY_API_KEY}`

    const response = await firstValueFrom(this.httpService.get(url))

    // Empty response
    if (!response.data || response.data.length === 0) {
      throw new WordNotFoundError(word);
    }
    return response.data
    
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} dictionary`;
  // }

  // update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
  //   return `This action updates a #${id} dictionary`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dictionary`;
  // }
}
