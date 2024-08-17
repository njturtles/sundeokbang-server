import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Repository } from 'typeorm';
import { File } from '../../../entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../../entities/room.entity';

@Injectable()
export class FileService {
    private readonly s3: S3Client;

    constructor(
        private readonly env: ConfigService,
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {
        this.s3 = new S3Client({
            region: this.env.get('AWS_S3_IMAGE_REGION'),
            credentials: {
                accessKeyId: this.env.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.env.get('AWS_ACCESS_KEY_SECRET'),
            },
        });
    }

    async create(room: Room, files: Express.MulterS3.File[]): Promise<void> {
        const urls = files.map((file) => file.location);

        const newFiles = urls.map((url) =>
            this.fileRepository.create({ url, room }),
        );

        await this.fileRepository.save(newFiles);
    }

    async delete(roomId: number): Promise<void> {
        await this.fileRepository.delete({ room: { _id: roomId } });
    }

    async replace(room: Room, files: Express.MulterS3.File[]) {
        await this.delete(room._id);

        await this.create(room, files);
    }
}
