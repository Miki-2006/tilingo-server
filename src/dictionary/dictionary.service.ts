import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InvalidApiKeyError, WordNotFoundError, RateLimitExceededError, DictionaryApiError } from 'src/common/errors/dicitonary.errors';


@Injectable()
export class DictionaryService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async findDefinitionOfWord(word: string): Promise<any> {
    const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_DICTIONARY_API_KEY}`

    try {
      const response = await firstValueFrom(this.httpService.get(url))

      if (!process.env.MERRIAM_DICTIONARY_API_KEY) {
        throw new InvalidApiKeyError();
      }

      if (Array.isArray(response.data) && response.data.length > 0 && typeof response.data[0] === 'string') {
        throw new WordNotFoundError(word);
      }

      // Empty response
      if (!response.data || response.data.length === 0) {
        throw new WordNotFoundError(word);
      }
      return response.data
    } catch (error) {
      if (
        error instanceof InvalidApiKeyError ||
        error instanceof WordNotFoundError ||
        error instanceof RateLimitExceededError ||
        error instanceof DictionaryApiError
      ) {
        throw error; // preserve your custom errors
      }

      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new InvalidApiKeyError();
          case 404:
            throw new WordNotFoundError(word);
          case 429:
            throw new RateLimitExceededError();
          default:
            throw new DictionaryApiError(
              `Dictionary API responded with status ${error.response.status}`,
              error.response.status
            );
        }
      } else if (error.request) {
        throw new DictionaryApiError(
          'No response received from Dictionary API',
          502
        );
      } else {
        throw new DictionaryApiError(
          `Error setting up API request: ${error.message}`,
          500
        );
      }
    }

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
