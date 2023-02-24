import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('notifications')
  async listNotifications(): Promise<any> {
    const notifications = await this.githubService.getNotifications();
    return notifications;
  }
}
