
import { NotificationsRepository } from "../../src/application/repositories/notifications-repository";
import { Notification } from "../../src/application/entities/notification";


export class InMemoryNotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }
    async findById(notificationId: string): Promise<Notification> {
        const notification = this.notifications.find(
            (item => (item.id === notification))
        )
        if (!notification) {
            return null;
        }

        return notification
    }
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(
            (notifications) => notifications.recipientId === recipientId)
    }
    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(
            (notifications) => notifications.recipientId === recipientId).length
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            (item => item.id === notification.id)
        )

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
};