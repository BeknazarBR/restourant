import { v4 } from 'uuid';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  ReadStream,
} from 'fs';
import { join } from 'path';
import { FileAdapterError } from '../errors/file-adapter.error';

export interface File {
  name: string;
}
export interface FileMeta {
  name: string;
}

export class FileAdapter {
  constructor(readonly uploadDir = join('uploads')) {}

  public put(buffer: Buffer, meta?: FileMeta): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!buffer) {
        reject(new FileAdapterError('file must be attached'));
      }
      const name = meta.name || v4();

      const stream = createWriteStream(this.getFilePath(name));

      stream.write(buffer);
      stream.on('error', (e) => reject(new FileAdapterError(e.message)));
      stream.on('finish', () => resolve({ name }));
    });
  }

  public get(name: string): ReadStream {
    const path = this.getFilePath(name);
    const isExists = existsSync(path);
    if (!isExists || !name) {
      throw new FileAdapterError('file not exist');
    }
    return createReadStream(path);
  }

  public isExists(name: string): boolean {
    const path = this.getFilePath(name);
    return existsSync(path);
  }

  private getFilePath(name: string) {
    return join(this.uploadDir, name);
  }
}
const fileAdapter = new FileAdapter('uploads');

export { fileAdapter };
