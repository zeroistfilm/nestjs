import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentsService } from '../../../application/service/contents.service';

@ApiTags('Contents')
@Controller('/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}
  @Get('/sample')
  sample() {
    const url = 'https://dgr2qbao3x4a0.cloudfront.net/temp/Fish.m3u8';
    return {
      url: url,
    };
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.contentsService.uploadToS3(file);
  }
}
