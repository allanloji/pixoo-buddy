import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class YtMusicService {
  private lastSong: string;
  private readonly logger = new Logger(YtMusicService.name);

  @Interval(20000)
  async getNowPlaying(): Promise<void> {
    const { data: history }: any = await axios.get(
      'http://ytmusicapi:8000/api/v1/history',
    );

    const id = history[0].videoId;
    if (id === this.lastSong) {
      return;
    }

    this.lastSong = id;
    this.logger.debug('Called pixoo');
    const lastSong = history[0].thumbnails[1].url;
    const blob = await axios.get(lastSong, {
      responseType: 'stream',
    });

    const bodyFormData = new FormData();

    bodyFormData.append('image', blob.data, 'image.jpg');
    bodyFormData.append('x', '0');
    bodyFormData.append('y', '0');
    bodyFormData.append('push_immediately', 'true');

    const pixooURL = 'http://pixoo-rest:5000/image';
    await axios.post(pixooURL, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...bodyFormData.getHeaders(),
      },
    });
  }
}
