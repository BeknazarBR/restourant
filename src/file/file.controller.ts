import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('file')
export class FileController {
  constructor(private service: FileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = new CreateFileDto();

    data.contentType = file.mimetype;
    data.buffer = file.buffer;
    data.size = file.size;

    return this.service.create(data);
  }

  @Put(':name')
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = new CreateFileDto();

    data.contentType = file.mimetype;
    data.buffer = file.buffer;
    data.size = file.size;
    data.name = name;

    return this.service.update(data);
  }

  @Get(':name')
  getFile(@Param('name') name: string) {
    return this.service.get(name);
  }
}
