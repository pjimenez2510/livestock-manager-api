import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { LivestockModule } from './modules/livestock/livestock.module'
import { FarmsModule } from './modules/farms/farms.module'

@Module({
  imports: [UsersModule, AuthModule, LivestockModule, FarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
