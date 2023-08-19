import { Injectable } from '@nestjs/common';
import { AbstractEntityRepository } from '../abstractEntity.repository';
import { TripEntity } from 'src/pg/entity/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TripRepository extends AbstractEntityRepository<TripEntity> {
    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>
    ) {
        super(tripRepository);
    }
}
