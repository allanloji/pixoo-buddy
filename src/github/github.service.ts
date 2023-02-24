import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { Octokit } from '@octokit/core';

@Injectable()
export class GithubService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private octokit = new Octokit({});

  private readonly logger = new Logger(GithubService.name);
  private lastModified: string | undefined = '';

  async getNotifications() {
    const response = await this.octokit.request('GET /notifications', {
      per_page: 1,
      headers: {
        'If-Modified-Since': this.lastModified,
      },
    });

    return response;
  }

  @Timeout('Notifications', 5000)
  async setNotificationsInterval() {
    let nextInterval = 60;
    try {
      const response = await this.getNotifications();
      this.lastModified = response.headers['last-modified'];
      nextInterval = Number(response.headers['x-poll-interval']);
    } catch (error) {
      if (error.status === 304) {
        this.logger.log(`No new notifications`);
      }
    }

    if (this.schedulerRegistry.getTimeout('Notifications')) {
      this.schedulerRegistry.deleteTimeout('Notifications');
    }

    const callback = () => {
      this.logger.log(`Getting notifications after ${nextInterval}`);
      this.setNotificationsInterval();
    };

    const timeout = setTimeout(callback, nextInterval * 1000);
    this.schedulerRegistry.addTimeout('Notifications', timeout);
  }
}
