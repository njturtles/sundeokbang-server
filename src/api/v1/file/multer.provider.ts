import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from '@nestjs/platform-express';
import multerS3 from 'multer-s3';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    private readonly s3: S3Client;

    constructor(private readonly env: ConfigService) {
        this.s3 = new S3Client({
            region: this.env.get('AWS_S3_IMAGE_REGION'),
            credentials: {
                accessKeyId: this.env.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.env.get('AWS_ACCESS_KEY_SECRET'),
            },
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: multerS3({
                s3: this.s3,
                contentType: multerS3.AUTO_CONTENT_TYPE,
                bucket: this.env.get('AWS_S3_IMAGE_BUCKET'),
                acl: 'public-read',
                key: (req, file, cb) => {
                    const fileName = `images/${file.originalname}`;
                    cb(null, fileName);
                },
            }),
            limits: {
                fileSize: 100 * 1024 * 1024,
            },
        };
    }
}
