import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { LivestockModule } from './modules/livestock/livestock.module'

@Module({
  imports: [UsersModule, AuthModule, LivestockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
