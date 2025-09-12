export class DictionaryApiError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
    this.name = 'DictionaryApiError';
  }
}

export class WordNotFoundError extends DictionaryApiError {
  constructor(word: string) {
    super(`Can not found definition for word: ${word}`, 404);
    this.name = 'WordNotFoundError';
  }
}

export class InvalidApiKeyError extends DictionaryApiError {
  constructor() {
    super('Invalid Merriam-Webster API key', 401);
    this.name = 'InvalidApiKeyError';
  }
}

export class RateLimitExceededError extends DictionaryApiError {
  constructor() {
    super('Merriam-Webster API rate limit exceeded', 429);
    this.name = 'RateLimitExceededError';
  }
}