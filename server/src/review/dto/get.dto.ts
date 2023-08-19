import { IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { ReviewEntity } from 'src/pg/entity/review.entity';

export class ReviewGetQueryDto {
    @IsString()
    reviewId!: string;
}

export class ReviewOfDriverGetQueryDto {
    @IsString()
    driverId!: string;
}

export class ReviewOfDriverGetResponseDto extends AbstractBaseResponse {
    value!: { itemList: Partial<ReviewEntity>[] };
}

export class ReviewGetResponseDto extends AbstractBaseResponse {
    value!: { itemList: Partial<ReviewEntity>[] };
}
