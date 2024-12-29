import { Module } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { SubscriptionsController } from './subscriptions.controller'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { CryptoModule } from '../crypto/crypto.module'

@Module({
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
  imports: [PrismaModule, CryptoModule],
})
export class SubscriptionsModule {}
