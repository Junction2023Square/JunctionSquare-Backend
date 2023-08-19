import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: typeormConfig,
        }),
        DriverModule,
        TripModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
