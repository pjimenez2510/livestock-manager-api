import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { EventsBackgroundService } from './events.background.service'
import { NotificationsModule } from '../notifications/notifications.module'
import { SubscriptionsModule } from '../subscriptions/subscriptions.module'

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsBackgroundService],
  imports: [PrismaModule, NotificationsModule, SubscriptionsModule],
  exports: [EventsService, EventsBackgroundService],
})
export class EventsModule {}
