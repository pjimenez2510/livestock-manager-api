import { Module } from '@nestjs/common'
import { FarmsService } from './farms.service'
import { FarmsController } from './farms.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { LivestockModule } from '../livestock/livestock.module'

@Module({
  controllers: [FarmsController],
  imports: [PrismaModule, LivestockModule],
  providers: [FarmsService],
  exports: [FarmsService],
})
export class FarmsModule {}
