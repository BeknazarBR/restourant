export class CreateFileDto {
  name: string;
  contentType: string;
  size: number;
  buffer: Buffer;
}
