import { Module } from '@nestjs/common'
import { AnimalsService } from './animals.service'
import { AnimalsController } from './animals.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [PrismaModule],
})
export class AnimalsModule {}
