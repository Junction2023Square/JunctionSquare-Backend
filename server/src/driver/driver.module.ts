import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { DriverRepository } from 'src/pg/repository/driver/driver.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DriverEntity])],
    controllers: [DriverController],
    providers: [DriverService, DriverRepository],
})
export class DriverModule {}
