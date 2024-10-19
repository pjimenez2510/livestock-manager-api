import { Module } from '@nestjs/common'
import { VaccinesService } from './vaccines.service'
import { VaccinesController } from './vaccines.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [VaccinesController],
  providers: [VaccinesService],
  imports: [PrismaModule],
})
export class VaccinesModule {}
