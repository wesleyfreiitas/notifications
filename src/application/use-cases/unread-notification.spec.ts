import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";
import { makeNotification } from "test/factories/notification.factory";

describe('unread notification', () => {
    it('should be able to send a notification', async ()  => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationsRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })
    it('should not be able to unread a notification when it does not exist', async () =>  {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);
        
        expect(() => {
            return unreadNotification.execute({
                        notificationId:'fake-notification-id',
                    })
        }).rejects.toThrow(NotificationNotFound)
    })
})