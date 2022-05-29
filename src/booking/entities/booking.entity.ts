import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Table } from '../../table/entities/table.entity';
import { BookingStatusTypes } from '../types/booking-status.types';

@Entity()
export class Booking extends BaseEntity {
  @Column()
  seatsCount: number;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column({
    type: 'enum',
    enum: BookingStatusTypes,
    default: BookingStatusTypes.PENDING,
  })
  status: BookingStatusTypes;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Table)
  table: Table;
}
