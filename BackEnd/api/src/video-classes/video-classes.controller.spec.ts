import { Test, TestingModule } from '@nestjs/testing';
import { VideoClassesController } from './video-classes.controller';

describe('VideoClassesController', () => {
  let controller: VideoClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoClassesController],
    }).compile();

    controller = module.get<VideoClassesController>(VideoClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
