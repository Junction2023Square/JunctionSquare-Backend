import { UuidLength } from 'src/constant/uuid';
import { CarSizeType } from 'src/type/driver';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { TripEntity } from './trip.entity';

@Entity({ name: 'driver' })
export class DriverEntity {
    @PrimaryColumn({ type: 'varchar', length: UuidLength })
    driverId: string = v4();

    @Column({ type: 'varchar', length: 50 })
    name!: string;

    @Column({ type: 'integer' })
    drives!: number;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    averageRating!: number;

    @Column({ type: 'varchar', length: 200 })
    region!: string;

    @Column({ type: 'varchar' })
    carSize!: CarSizeType;

    @Column({ type: 'varchar', length: 500 })
    profileImgUrl?: string;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @DeleteDateColumn({ select: false })
    deletedAt?: string;

    @OneToMany(() => DriverEntity, (driver) => driver.trip)
    trip!: TripEntity[];
}
