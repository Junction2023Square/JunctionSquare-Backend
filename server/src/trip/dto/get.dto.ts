import { IsString } from 'class-validator';
import { AbstractBaseResponse } from 'src/constant/response.constant';
import { TripEntity } from 'src/pg/entity/trip.entity';

export class TripGetQueryDto {
    @IsString()
    tripId!: string;
}

export class TripGetResponseDto extends AbstractBaseResponse {
    value!: { itemlist: Partial<TripEntity>[] };
}
