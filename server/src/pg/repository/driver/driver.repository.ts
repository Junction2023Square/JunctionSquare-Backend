import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractEntityRepository } from '../abstractEntity.repository';
import { DriverEntity } from 'src/pg/entity/driver.entity';

@Injectable()
export class DriverRepository extends AbstractEntityRepository<DriverEntity> {
    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>
    ) {
        super(driverRepository);
    }
}
