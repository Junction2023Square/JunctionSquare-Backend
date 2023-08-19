import { Injectable } from '@nestjs/common';
import { DriverPostBodyDto } from './dto/post.dto';
import { DriverRepository } from 'src/pg/repository/driver/driver.repository';

@Injectable()
export class DriverService {
    constructor(private readonly driverRepository: DriverRepository) {}
    public async create({ name, region, carSize, profileImgUrl }: DriverPostBodyDto) {
        const newDriver = {
            name,
            drives: 0,
            averageRating: 0,
            region,
            carSize,
            profileImgUrl,
        };
        const newEntity = this.driverRepository.create(newDriver);
        return this.driverRepository.save(newEntity);
    }

    public async getOne(driverId: string) {
        const driver = await this.driverRepository.findOneBy({ driverId });
        if (driver === null) {
            throw new Error(`Driver with ${driverId} not found`);
        }
        return driver;
    }

    public async getMany() {
        return this.driverRepository.find();
    }
}
