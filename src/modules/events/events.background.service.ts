import { Injectable, Logger } from '@nestjs/common'
import { EventsService } from './events.service'
import { SubscriptionsService } from '../subscriptions/subscriptions.service'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class EventsBackgroundService {
  constructor(
    private readonly eventService: EventsService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async checkEvents() {
    const now = new Date()
    const minutes = now.getMinutes()
    this.notifyEvents(minutes)
  }

  private async notifyEvents(minutes: number) {
    const dateCopy = new Date()
    dateCopy.setSeconds(0)
    dateCopy.setMilliseconds(0)
    dateCopy.setMinutes(minutes)

    Logger.log(`Checking events for ${dateCopy.getMinutes()} minutes`)
    Logger.log(`Checking events for ${dateCopy} date`)

    const events = await this.eventService.findAll({
      startDate: dateCopy,
    })

    for (const event of events) {
      console.log('Event:', event)
      const subscriptions = await this.subscriptionsService.findAll({
        available: true,
      })

      try {
        subscriptions.forEach((subscription) => {
          this.notificationsService.sendPushNotification({
            title: event.title,
            body: event.description,
            endpoint: subscription.token,
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
