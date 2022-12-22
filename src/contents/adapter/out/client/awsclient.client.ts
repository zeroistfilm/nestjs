import { Injectable } from '@nestjs/common';
import { AwsClientInterface } from '../../../application/port/out/aws.client.interface';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsClient implements AwsClientInterface {
  async uploadFile(file: Express.Multer.File): Promise<any> {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'dropbase.tpx',
      Key: 'temp/' + Buffer.from(file.originalname, 'latin1').toString('utf8'),
      Body: file.buffer,
    };
    console.log(params);
    return await s3.upload(params).promise();
  }
}
