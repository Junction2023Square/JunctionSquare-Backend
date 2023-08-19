import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from 'src/pg/entity/trip.entity';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from 'src/pg/repository/trip/trip.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TripEntity])],
    controllers: [TripController],
    providers: [TripService, TripRepository],
})
export class TripModule {}
