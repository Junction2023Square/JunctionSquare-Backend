import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractEntityRepository } from '../abstractEntity.repository';
import { ReviewEntity } from 'src/pg/entity/review.entity';

@Injectable()
export class ReviewRepository extends AbstractEntityRepository<ReviewEntity> {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>
    ) {
        super(reviewRepository);
    }
}
