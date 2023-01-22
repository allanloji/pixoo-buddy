import { Test, TestingModule } from '@nestjs/testing';
import { YtMusicService } from './yt-music.service';

describe('YtMusicService', () => {
  let service: YtMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtMusicService],
    }).compile();

    service = module.get<YtMusicService>(YtMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
