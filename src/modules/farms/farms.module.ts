import { Module } from '@nestjs/common'
import { FarmsService } from './farms.service'
import { FarmsController } from './farms.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [FarmsController],
  imports: [PrismaModule],
  providers: [FarmsService],
})
export class FarmsModule {}
