import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

export const S3Provider = {
    provide: 'S3',
    useFactory: (env: ConfigService): S3 => {
        return new S3({
            accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
            endpoint: env.get('AWS_S3_ENDPOINT'),
            region: env.get('AWS_REGION'),
            s3ForcePathStyle: true,
        });
    },
    inject: [ConfigService],
};
