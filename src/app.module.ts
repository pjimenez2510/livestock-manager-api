import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { FarmsModule } from './modules/farms/farms.module'
import { LotsModule } from './modules/lots/lots.module'
import { VaccinesModule } from './modules/vaccines/vaccines.module'
import { BreedsModule } from './modules/breeds/breeds.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FarmsModule,
    LotsModule,
    VaccinesModule,
    BreedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
