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
  constructor(dictionary: string) {
    super(`${dictionary} API key error`, 401);
    this.name = this.constructor.name;
  }
}

export class RateLimitExceededError extends DictionaryApiError {
  constructor(dictionary: string) {
    super(`${dictionary} API rate limit exceeded`, 429);
    this.name = this.constructor.name;
  }
}