import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { ReviewEntity } from 'src/pg/entity/review.entity';

export class ReviewPostBodyDto {
    @IsNumber()
    @ApiProperty()
    rating!: number;

    @IsString()
    @ApiProperty()
    content!: string;

    @IsString()
    @ApiProperty()
    title!: string;

    @IsString()
    @ApiProperty()
    tripId!: string;
}

export class ReviewPostResponseDto extends AbstractBaseResponse {
    value!: ReviewEntity;
}
