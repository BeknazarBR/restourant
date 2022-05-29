import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Price } from './entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PriceService extends BaseService<Price> {
  constructor(@InjectRepository(Price) repository: Repository<Price>) {
    super(repository);
  }
}
