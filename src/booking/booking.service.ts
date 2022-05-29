import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(@InjectRepository(Booking) repository: Repository<Booking>) {
    super(repository);
  }
}
