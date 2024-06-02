import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';

@Injectable()
export class FileService {
    private readonly bucketName: string;
    private readonly s3Endpoint: string;

    constructor(
        @Inject('S3') private readonly s3: S3,
        private readonly env: ConfigService,
    ) {
        this.bucketName = this.env.get<string>('AWS_BUCKET_NAME');
        this.s3Endpoint = this.env.get<string>('AWS_S3_ENDPOINT');
    }

    async uploadFiles(
        files: Express.Multer.File | Express.Multer.File[],
    ): Promise<string[]> {
        files = this.ensureArray(files);
        const uploadPromises = files.map((file) => this.uploadFile(file));
        return await Promise.all(uploadPromises);
    }

    async deleteFiles(fileNames: string | string[]): Promise<void[]> {
        fileNames = this.ensureArray(fileNames);
        const deletePromises = fileNames.map((fileName) =>
            this.deleteFile(fileName),
        );
        return await Promise.all(deletePromises);
    }

    private ensureArray<T>(item: T | T[]): T[] {
        return Array.isArray(item) ? item : [item];
    }

    private async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const params = {
            Bucket: this.bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            await this.s3.upload(params).promise();
            return this.getFileUrl(fileName);
        } catch (error) {
            throw new ApiError(ApiCodes.CONFLICT, ApiMessages.CONFLICT);
        }
    }

    private async deleteFile(fileName: string): Promise<void> {
        const params = {
            Bucket: this.bucketName,
            Key: fileName,
        };

        try {
            await this.s3.deleteObject(params).promise();
        } catch (error) {
            throw new ApiError(ApiCodes.CONFLICT, ApiMessages.CONFLICT);
        }
    }

    private getFileUrl(fileName: string): string {
        return `${this.s3Endpoint}/${this.bucketName}/${fileName}`;
    }
}
