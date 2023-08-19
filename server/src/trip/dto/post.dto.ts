import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { TripEntity } from 'src/pg/entity/trip.entity';
import { Point } from 'typeorm';

export class TripPostBodyDto {
    @IsString()
    @ApiProperty()
    startDate!: Date;

    @IsString()
    @ApiProperty()
    endDate!: Date;

    @IsString()
    @ApiProperty()
    driverId!: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    userId?: string;

    @IsNotEmpty()
    @ApiProperty({
        example: { type: 'Point', coordinates: [1.23, 4.56] },
    })
    pickupLocation!: Point;
}

export class TripPostResponseDto extends AbstractBaseResponse {
    value!: TripEntity;
}
