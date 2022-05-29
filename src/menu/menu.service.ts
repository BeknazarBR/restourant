import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService extends BaseService<Menu> {
  constructor(@InjectRepository(Menu) repository: Repository<Menu>) {
    super(repository);
  }
}
