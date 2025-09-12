import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RandomWordService {
  constructor(
    private readonly httpService: HttpService,
  ) { }




  async getDefinition(word: string, language: string = 'en') {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`

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
