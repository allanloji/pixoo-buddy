import { Module } from '@nestjs/common';
import { YtMusicService } from './yt-music.service';
import { YtMusicController } from './yt-music.controller';

@Module({
  providers: [YtMusicService],
  controllers: [YtMusicController],
})
export class YtMusicModule {}
