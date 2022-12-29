import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from '../http/controllers/notifications.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [AppService],
    }).compile();

    appController = app.get<NotificationsController>(NotificationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.list()).toBe('Hello World!');
    });
  });
});
