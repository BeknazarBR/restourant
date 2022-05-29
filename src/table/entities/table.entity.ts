import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity()
export class Table extends BaseEntity {
  @Column()
  group: string;

  @Column()
  index: number;

  @Column()
  seatsCount: number;

  @OneToMany(() => Booking, (booking) => booking.table)
  bookings: Booking[];
}
