import { Test, TestingModule } from '@nestjs/testing';
import { YtMusicController } from './yt-music.controller';

describe('YtMusicController', () => {
  let controller: YtMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YtMusicController],
    }).compile();

    controller = module.get<YtMusicController>(YtMusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
