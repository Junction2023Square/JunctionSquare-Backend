import { Injectable } from '@nestjs/common';
import { ReviewRepository } from 'src/pg/repository/review/review.repository';
import { ReviewPostBodyDto } from './dto/post.dto';

@Injectable()
export class ReviewService {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    public async getOne(reviewId: string) {
        const review = await this.reviewRepository.findOneBy({ reviewId });
        if (review === null) {
            throw new Error(`Review with ${reviewId} not found`);
        }
    }

    public async getMany() {
        return this.reviewRepository.find();
    }

    public async create({ rating, content, title, tripId }: ReviewPostBodyDto) {
        const newReview = {
            rating,
            content,
            title,
            tripId,
        };
        const newEntity = this.reviewRepository.create(newReview);
        return this.reviewRepository.save(newEntity);
    }
}
