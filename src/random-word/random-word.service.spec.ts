import { Test, TestingModule } from '@nestjs/testing';
import { RandomWordService } from './random-word.service';

describe('RandomWordService', () => {
  let service: RandomWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomWordService],
    }).compile();

    service = module.get<RandomWordService>(RandomWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
