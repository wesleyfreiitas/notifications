import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";
import { makeNotification } from "test/factories/notification.factory";

describe('Count recipients notifications', () => {
    it('should be able to count recipient notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const countRecipientNotifications = new CountRecipientNotification(
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
        
    const { count } = await countRecipientNotifications.execute({
        recipientId: ''
    });

    expect(count).toEqual(2)
})

})