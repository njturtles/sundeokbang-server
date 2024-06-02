import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3Provider } from './s3.provider';

@Module({
    providers: [FileService, S3Provider],
})
export class FileModule {}
