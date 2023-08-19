import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { CarSizeType, carSizeList } from 'src/type/driver';

export class DriverPostBodyDto {
    @IsString()
    @ApiProperty()
    name!: string;

    @IsString()
    @ApiProperty()
    region!: string;

    @IsEnum(carSizeList)
    @ApiProperty({ enum: carSizeList, enumName: 'CarSizeType' })
    carSize!: CarSizeType;

    @IsString()
    @ApiProperty()
    profileImgUrl!: string;
}

export class DriverPostResponseDto extends AbstractBaseResponse {
    value!: DriverEntity;
}
