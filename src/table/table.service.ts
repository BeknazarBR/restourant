import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Table } from './entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TableService extends BaseService<Table> {
  constructor(@InjectRepository(Table) repository: Repository<Table>) {
    super(repository);
  }
}
