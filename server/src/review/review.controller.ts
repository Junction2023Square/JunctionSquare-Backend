import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { HttpStatusCode } from 'src/constant/httpStatus.constant';
import { ReviewPostBodyDto, ReviewPostResponseDto } from './dto/post.dto';

@Controller('review')
@ApiTags('리뷰 API')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get(':reviewId')
    @ApiOperation({ summary: '특정 리뷰ID로 조회' })
    public async get(@Param('reviewid') reviewId: string) {
        const review = await this.reviewService.getOne(reviewId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: [review] } };
    }

    @Get()
    @ApiOperation({ summary: '모든 리뷰 조회' })
    public async getAll() {
        const itemList = await this.reviewService.getMany();
        const value = { itemList };
        return { statusCode: HttpStatusCode.ok, value };
    }

    @Post()
    @ApiOperation({ summary: '새로운 리뷰 등록' })
    public async post(@Body() body: ReviewPostBodyDto): Promise<ReviewPostResponseDto> {
        const value = await this.reviewService.create(body);
        console.log(`[LOG] created review ${value}`);
        return { statusCode: HttpStatusCode.ok, value };
    }
}
