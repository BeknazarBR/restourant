import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
