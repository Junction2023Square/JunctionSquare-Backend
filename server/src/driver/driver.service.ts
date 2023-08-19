import { Injectable } from '@nestjs/common';
import { DriverPostBodyDto } from './dto/post.dto';
import { DriverRepository } from 'src/pg/repository/driver/driver.repository';
import { ReviewRepository } from 'src/pg/repository/review/review.repository';
import { TripRepository } from 'src/pg/repository/trip/trip.repository';

@Injectable()
export class DriverService {
    constructor(
        private readonly driverRepository: DriverRepository,
        private readonly reviewRepository: ReviewRepository,
        private readonly tripRepository: TripRepository
    ) {}
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

    public async getDriverReview(driverId: string) {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.trip', 'trip')
            .leftJoinAndSelect('trip.driver', 'driver')
            .where('trip.driverId = :driverId', { driverId })
            .select(['review'])
            .getMany();
    }

    public async getDriverTrip(driverId: string) {
        console.log(driverId);
        const aList = await this.tripRepository
            .createQueryBuilder('trip')
            .leftJoinAndSelect('trip.driver', 'driver')
            .where('trip.driverId = :driverId', { driverId })
            .getMany();

        console.log(aList);
        return aList;
    }
}
