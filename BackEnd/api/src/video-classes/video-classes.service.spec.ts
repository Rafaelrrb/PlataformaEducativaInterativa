import { Test, TestingModule } from '@nestjs/testing';
import { VideoClassesService } from './video-classes.service';

describe('VideoClassesService', () => {
  let service: VideoClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoClassesService],
    }).compile();

    service = module.get<VideoClassesService>(VideoClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
