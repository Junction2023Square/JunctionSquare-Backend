import { UuidLength } from 'src/constant/uuid';
import { TripStatusType } from 'src/type/trip';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    Point,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { DriverEntity } from './driver.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'trip' })
export class TripEntity {
    @PrimaryColumn({ type: 'varchar', length: UuidLength })
    tripId: string = v4();

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @DeleteDateColumn({ select: false })
    deletedAt?: string;

    @Column({ type: 'varchar' })
    driverId!: string;

    @Column({ type: 'varchar', nullable: true })
    userId?: string;

    @Column({ type: 'varchar' })
    status!: TripStatusType;

    @Column({ type: 'timestamp' })
    startDate!: Date;

    @Column({ type: 'timestamp' })
    endDate!: Date;

    @Column({ type: 'geography', spatialFeatureType: 'Point' })
    pickupLocation!: Point;

    @ManyToOne(() => DriverEntity, (driver) => driver.trip, { onDelete: 'CASCADE' })
    driver!: DriverEntity;

    @OneToOne(() => ReviewEntity, (review) => review.trip, { nullable: true })
    @JoinColumn()
    review?: ReviewEntity;
}
