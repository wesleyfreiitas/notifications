import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Get , Post} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notifications-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification, 
    private cancelNotification:CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification 
    ){}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string
  ){
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId:string
  ): Promise<{count: number}>{
    const {count} = await this.countRecipientNotification.execute({
      recipientId
    })

    return{
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId:string
    ){
      const {notifications} = await this.getRecipientNotification.execute({
        recipientId
      })
  
      return{
        notifications: notifications.map(NotificationViewModel.toHTTP)
      }
    }

  @Patch(':id/read')
  async read(
    @Param('id') id: string
  ){
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(
    @Param('id') id: string
  ){
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const {content, category, recipientId} = body;
    const {notification} = await this.sendNotification.execute({
      content, category, recipientId
    });
    return {notification : NotificationViewModel.toHTTP(notification)}
  }
}
