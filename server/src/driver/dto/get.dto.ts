import { IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { DriverEntity } from 'src/pg/entity/driver.entity';

export class DriverGetQueryDto {
    @IsString()
    driverId!: string;
}

export class DriverGetResponseDto extends AbstractBaseResponse {
    value!: { itemList: Partial<DriverEntity>[] };
}
