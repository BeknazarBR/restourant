import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private service: FileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.create(file);
  }

  @Put(':name')
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(name, file);
  }

  @Get(':name')
  getFile(@Param('name') name: string, @Res() res) {
    const file = this.service.get(name);
    file.pipe(res);
  }
}
