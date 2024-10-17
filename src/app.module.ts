import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { FarmsModule } from './modules/farms/farms.module'
import { LotsModule } from './modules/lots/lots.module'

@Module({
  imports: [AuthModule, UsersModule, FarmsModule, LotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
