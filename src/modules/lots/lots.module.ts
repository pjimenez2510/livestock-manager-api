import { Module } from '@nestjs/common'
import { LotsService } from './lots.service'
import { LotsController } from './lots.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { FarmsModule } from '../farms/farms.module'

@Module({
  controllers: [LotsController],
  imports: [PrismaModule, FarmsModule],
  providers: [LotsService],
})
export class LotsModule {}
