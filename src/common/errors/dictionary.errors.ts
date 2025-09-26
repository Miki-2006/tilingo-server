export class DictionaryApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class WordNotFoundError extends DictionaryApiError {
  constructor(word: string) {
    super(`Could not find definition for word: ${word}`, 404);
    this.name = this.constructor.name;
  }
}

export class InvalidApiKeyError extends DictionaryApiError {
  constructor() {
    super('Invalid Merriam-Webster API key', 401);
    this.name = this.constructor.name;
  }
}

export class RateLimitExceededError extends DictionaryApiError {
  constructor() {
    super('Merriam-Webster API rate limit exceeded', 429);
    this.name = this.constructor.name;
  }
}