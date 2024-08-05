import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { File } from '../../../entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [FileService],
    imports: [TypeOrmModule.forFeature([File])],
    exports: [FileService],
})
export class FileModule {}
