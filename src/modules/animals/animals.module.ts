import { Module } from '@nestjs/common'
import { AnimalsService } from './animals.service'
import { AnimalsController } from './animals.controller'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [PrismaModule, CloudinaryModule],
})
export class AnimalsModule {}
