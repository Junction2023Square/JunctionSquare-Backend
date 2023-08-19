import { UuidLength } from 'src/constant/uuid';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { TripEntity } from './trip.entity';

@Entity({ name: 'review' })
export class ReviewEntity {
    @PrimaryColumn({ type: 'varchar', length: UuidLength })
    reviewId: string = v4();

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @DeleteDateColumn({ select: false })
    deletedAt?: string;

    @Column({ type: 'varchar', length: UuidLength })
    tripId!: string;

    @Column({ type: 'integer' })
    rating!: number;

    @Column({ type: 'varchar', length: 500 })
    content?: string;

    @Column({ type: 'varchar', length: 200 })
    title?: string;

    @OneToOne(() => TripEntity, (trip) => trip.review)
    @JoinColumn({ name: 'tripId' })
    trip!: TripEntity;
}
