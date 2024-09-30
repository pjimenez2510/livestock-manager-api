import { Module } from '@nestjs/common'
import { LivestockService } from './livestock.service'
import { LivestockController } from './livestock.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [LivestockController],
  exports: [LivestockService],
  imports: [PrismaModule],
  providers: [LivestockService],
})
export class LivestockModule {}
