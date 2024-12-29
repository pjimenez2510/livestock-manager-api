import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { FarmsModule } from './modules/farms/farms.module'
import { LotsModule } from './modules/lots/lots.module'
import { VaccinesModule } from './modules/vaccines/vaccines.module'
import { BreedsModule } from './modules/breeds/breeds.module'
import { AnimalsModule } from './modules/animals/animals.module'
import { EventsModule } from './modules/events/events.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { CryptoModule } from './modules/crypto/crypto.module'
import { FirebaseModule } from './modules/firebase/firebase.module'
import { ConfigModule } from '@nestjs/config'
import config from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    FarmsModule,
    LotsModule,
    VaccinesModule,
    BreedsModule,
    AnimalsModule,
    EventsModule,
    NotificationsModule,
    CryptoModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
