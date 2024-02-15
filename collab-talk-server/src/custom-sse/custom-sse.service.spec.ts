import { Test, TestingModule } from '@nestjs/testing';
import { CustomSseService } from './custom-sse.service';

describe('CustomSseService', () => {
  let service: CustomSseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomSseService],
    }).compile();

    service = module.get<CustomSseService>(CustomSseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
