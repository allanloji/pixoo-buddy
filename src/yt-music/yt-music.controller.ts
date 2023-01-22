import { Controller, Get } from '@nestjs/common';
import { YtMusicService } from './yt-music.service';

@Controller('yt-music')
export class YtMusicController {
  constructor(private readonly ytMusicService: YtMusicService) {}

  @Get('now-playing')
  async getNowPlaying(): Promise<void> {
    await this.ytMusicService.getNowPlaying();
  }
}
