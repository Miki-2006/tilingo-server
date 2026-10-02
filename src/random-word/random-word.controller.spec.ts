import { Test, TestingModule } from '@nestjs/testing';
import { RandomWordController } from './random-word.controller';
import { RandomWordService } from './random-word.service';

describe('RandomWordController', () => {
  let controller: RandomWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomWordController],
      providers: [RandomWordService],
    }).compile();

    controller = module.get<RandomWordController>(RandomWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
