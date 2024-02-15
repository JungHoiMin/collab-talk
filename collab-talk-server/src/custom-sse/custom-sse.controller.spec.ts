import { Test, TestingModule } from '@nestjs/testing';
import { CustomSseController } from './custom-sse.controller';

describe('CustomSseController', () => {
  let controller: CustomSseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomSseController],
    }).compile();

    controller = module.get<CustomSseController>(CustomSseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
