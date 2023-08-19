import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TripService } from './trip.service';
import { HttpStatusCode } from 'src/constant/httpStatus.constant';
import { TripPostBodyDto, TripPostResponseDto } from './dto/post.dto';

@Controller('trip')
@ApiTags('운행 API')
export class TripController {
    constructor(private readonly tripService: TripService) {}

    @Get(':tripId')
    @ApiOperation({ summary: '특정 운행 ID로 조회' })
    public async get(@Param('tripId') tripId: string) {
        const trip = await this.tripService.getOne(tripId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: [trip] } };
    }

    @Get()
    @ApiOperation({ summary: '모든 운행 조회' })
    public async getAll() {
        const itemList = await this.tripService.getMany();
        const value = { itemList };
        return { statusCode: HttpStatusCode.ok, value };
    }

    @Post()
    @ApiOperation({ summary: '새로운 운행 등록' })
    public async post(@Body() body: TripPostBodyDto): Promise<TripPostResponseDto> {
        const value = await this.tripService.create(body);
        console.log(`[LOG] created trip ${value}`);
        return { statusCode: HttpStatusCode.ok, value };
    }
}
