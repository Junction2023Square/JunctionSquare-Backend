import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/pg/entity/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from 'src/pg/repository/review/review.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ReviewEntity])],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
