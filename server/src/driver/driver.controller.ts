import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { HttpStatusCode } from 'src/constant/httpStatus.constant';
import { DriverGetResponseDto } from './dto/get.dto';
import { DriverPostBodyDto, DriverPostResponseDto } from './dto/post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewGetResponseDto } from 'src/review/dto/get.dto';

@Controller('driver')
@ApiTags('운전기사 API')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @Get(':driverId/review')
    @ApiOperation({ summary: '운전기사의 운행 리뷰 조회' })
    public async getDriverReview(@Param('driverId') driverId: string): Promise<ReviewGetResponseDto> {
        const reviewList = await this.driverService.getDriverReview(driverId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: reviewList } };
    }

    @Get(':driverId/trip')
    @ApiOperation({ summary: '운전기사의 운행 조회' })
    public async getDriverTrip(@Param('driverId') driverId: string): Promise<ReviewGetResponseDto> {
        console.log(driverId);
        const tripList = await this.driverService.getDriverTrip(driverId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: tripList } };
    }

    @Get(':driverId')
    @ApiOperation({ summary: '운전기사 조회 API ', description: '특정 운전기사 ID로 조회' })
    public async get(@Param('driverId') driverId: string): Promise<DriverGetResponseDto> {
        const driver = await this.driverService.getOne(driverId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: [driver] } };
    }

    @Get()
    @ApiOperation({ summary: '모든 운전기사 조회' })
    public async getAll(): Promise<DriverGetResponseDto> {
        const itemList = await this.driverService.getMany();
        const value = { itemList };
        return { statusCode: HttpStatusCode.ok, value };
    }

    @Post()
    @ApiOperation({ summary: '새로운 운전기사 등록' })
    public async post(@Body() body: DriverPostBodyDto): Promise<DriverPostResponseDto> {
        const value = await this.driverService.create(body);
        console.log(`[LOG] created driver ${value}`);
        return { statusCode: HttpStatusCode.ok, value };
    }
}
