import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class BaseService<Entity> {
  constructor(private repository: Repository<Entity | any>) {}

  async create(data): Promise<Entity> {
    const instance = this.repository.create(data);
    return this.repository.save(instance);
  }

  async find(query: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(query);
  }

  async findBy(query: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.repository.findBy(query);
  }

  async findOne(query: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOne(query);
  }

  async findOneBy(query: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.findOneBy(query);
  }

  async findAndCount(
    query: FindManyOptions<Entity>,
  ): Promise<[Entity[], number]> {
    return this.repository.findAndCount(query);
  }

  async updateOne(id: number, data: Entity): Promise<Entity> {
    const instance = await this.repository.findOneBy({
      id,
    });
    return this.repository.save({
      ...instance,
      ...data,
    });
  }

  async deleteOne(id): Promise<Entity> {
    const instance = await this.repository.findOneBy({
      id,
    });
    return this.repository.save({
      ...instance,
      isDeleted: true,
    });
  }
}
