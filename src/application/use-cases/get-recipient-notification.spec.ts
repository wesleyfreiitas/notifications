import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { makeNotification } from "test/factories/notification.factory";
import { GetRecipientNotification } from "./get-recipient-notification";

describe('get recipients notifications', () => {
    it('should be able to get recipient notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const getRecipientNotifications = new GetRecipientNotification(
            notificationsRepository
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' }),
        );
        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' }),
        );
        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-3' }),
        );
        
    const { notifications } = await getRecipientNotifications.execute({
        recipientId: ''
    });

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
        expect.objectContaining({recipientId:'recipient-1'}),
        expect.objectContaining({recipientId:'recipient-1'})
    ]))
})

})