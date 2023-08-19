import { IsEnum, IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { CarSizeType, carSizeList } from 'src/type/driver';

export class DriverPostBodyDto {
    @IsString()
    name!: string;

    @IsString()
    region!: string;

    @IsEnum(carSizeList)
    carSize!: CarSizeType;

    @IsString()
    profileImgUrl!: string;
}

export class DriverPostResponseDto extends AbstractBaseResponse {
    value!: DriverEntity;
}
