import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
import { UserRoleTypes } from '../types/user-role.types';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  code: string;

  @Column({
    type: 'enum',
    enum: UserRoleTypes,
    default: UserRoleTypes.USER,
  })
  role: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: User;
}
