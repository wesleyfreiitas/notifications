import { Notification } from "src/application/entities/notification";
import { NotificationsRepository } from "../../../../src/application/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notifications-mappers";
import { PrismaService } from "../prisma.service";

export class PrismaNotificationsRepository implements NotificationsRepository {
    
    constructor(private prisma: PrismaService){

    }
    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where:{
                recipientId
            }
        })
        return count
    }
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notification = await this.prisma.notification.findMany({
            where:{
                recipientId,
            }
        })
        return notification.map(notification => {
            return PrismaNotificationMapper.toDomain(notification)
        })
    }
    async findById(notificationId: string): Promise<Notification> {
        const notification = await this.prisma.notification.findUnique({
            where:{
                id: notificationId
            }
        });

        if (!notification){
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification)
    }
    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notification.update({
            where:{
                id: raw.id,
            },
            data: raw
        })
    }
    
    async create(notification: Notification): Promise<void> {
       const raw = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notification.create({
        data:{
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt
        }
       })
    }
}