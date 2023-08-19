import { Injectable } from '@nestjs/common';
import { TripRepository } from 'src/pg/repository/trip/trip.repository';
import { TripPostBodyDto } from './dto/post.dto';
import { TripStatusType } from 'src/type/trip';

@Injectable()
export class TripService {
    constructor(private readonly tripRepostiory: TripRepository) {}
    public async create({ startDate, endDate, driverId, userId, pickupLocation }: TripPostBodyDto) {
        const newTrip = {
            startDate,
            endDate,
            driverId,
            userId,
            pickupLocation,
            status: 'RESERVED' as TripStatusType,
        };
        const newEntity = this.tripRepostiory.create(newTrip);
        return this.tripRepostiory.save(newEntity);
    }

    public async getOne(tripId: string) {
        const trip = await this.tripRepostiory.findOneBy({ tripId });
        if (trip === null) {
            throw new Error(`Trip with ${tripId} not found`);
        }
        return trip;
    }

    public async getMany() {
        return this.tripRepostiory.find();
    }
}
