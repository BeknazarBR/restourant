import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { fileAdapter } from '../lib/adapters/file.adapter';
import { ApiError } from '../lib/errors/api.error';
import { ReadStream } from 'fs';

@Injectable()
export class FileService extends BaseService<File> {
  constructor(@InjectRepository(File) repository: Repository<File>) {
    super(repository);
  }

  async create(data: CreateFileDto): Promise<File> {
    try {
      const result = await fileAdapter.put(data.buffer);
      data.name = result.name;
      return super.create(data);
    } catch (e) {
      throw ApiError.internal(e);
    }
  }

  async update(data: CreateFileDto): Promise<File> {
    const isExists = fileAdapter.isExists(data.name);
    if (!isExists) {
      throw ApiError.notFound('file not found');
    }
    try {
      const result = await fileAdapter.put(data.buffer, data);
      data.name = result.name;
      return super.create(data);
    } catch (e) {
      throw ApiError.internal(e);
    }
  }

  get(name: string): ReadStream {
    const isExists = fileAdapter.isExists(name);
    if (!isExists) {
      throw ApiError.notFound('file not found');
    }
    return fileAdapter.get(name);
  }
}
