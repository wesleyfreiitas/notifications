import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecipientNotification } from "@application/use-cases/count-recipient-notification";
import { GetRecipientNotification } from "@application/use-cases/get-recipient-notification";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/application/use-cases/send-notification";
import { DatabaseModule } from "src/database/database.module";
import { NotificationsController } from "../http/controllers/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers:[
        NotificationsController
    ],
    providers:[
        SendNotification,
        CancelNotification,
        CountRecipientNotification,
        GetRecipientNotification,
        ReadNotification,
        UnreadNotification
    ]
})

export class HttpModule {}