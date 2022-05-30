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

  async create(file: Express.Multer.File): Promise<File> {
    if (!file) {
      throw ApiError.badRequest('file must be attached');
    }
    const result = await fileAdapter.put(file.buffer);
    const data = new CreateFileDto();
    console.log('result', result);
    data.name = result.name;
    data.size = file.size;
    data.contentType = file.mimetype;

    return super.create(data);
  }

  async update(name: string, file: Express.Multer.File): Promise<File> {
    const isExists = fileAdapter.isExists(name);
    if (!isExists) {
      throw ApiError.notFound('file not found');
    }
    try {
      const instance = await this.findOneBy({ name });
      await fileAdapter.put(file.buffer, { name });
      instance.size = file.size;
      instance.contentType = file.mimetype;
      return super.updateOne(instance.id, instance);
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
