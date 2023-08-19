import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { DriverRepository } from 'src/pg/repository/driver/driver.repository';
import { ReviewRepository } from 'src/pg/repository/review/review.repository';
import { TripRepository } from 'src/pg/repository/trip/trip.repository';
import { ReviewEntity } from 'src/pg/entity/review.entity';
import { TripEntity } from 'src/pg/entity/trip.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DriverEntity, ReviewEntity, TripEntity])],
    controllers: [DriverController],
    providers: [DriverService, DriverRepository, ReviewRepository, TripRepository],
})
export class DriverModule {}
