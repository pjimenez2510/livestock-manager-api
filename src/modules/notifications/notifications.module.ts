import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CryptoModule } from '../crypto/crypto.module'
import { FirebaseModule } from '../firebase/firebase.module'
import { SubscriptionsModule } from '../subscriptions/subscriptions.module'

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
  imports: [CryptoModule, FirebaseModule, SubscriptionsModule],
})
export class NotificationsModule {}
