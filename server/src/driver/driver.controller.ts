import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { HttpStatusCode } from 'src/constant/httpStatus.constant';
import { DriverGetResponseDto } from './dto/get.dto';
import { DriverPostBodyDto, DriverPostResponseDto } from './dto/post.dto';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @Get(':driverId')
    public async get(@Param('driverId') driverId: string): Promise<DriverGetResponseDto> {
        console.log(driverId);
        const driver = await this.driverService.getOne(driverId);
        return { statusCode: HttpStatusCode.ok, value: { itemList: [driver] } };
    }

    @Get()
    public async getAll(): Promise<DriverGetResponseDto> {
        const itemList = await this.driverService.getAll();
        const value = { itemList };
        return { statusCode: HttpStatusCode.ok, value };
    }

    @Post()
    public async post(@Body() body: DriverPostBodyDto): Promise<DriverPostResponseDto> {
        const value = await this.driverService.create(body);
        console.log(`[LOG] created driver ${value}`);
        return { statusCode: HttpStatusCode.ok, value };
    }
}
