import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RandomWordService {
  constructor(
    private readonly httpService: HttpService,
  ) { }




  async getDefinition(word: string) {
    const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_DICTIONARY_API_KEY}`
    
    try {      
      const response = await firstValueFrom(
        this.httpService.get(url)
      )
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch definition: ${error.message}`)
    }
  }
}
