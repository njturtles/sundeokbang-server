import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMysqlTypeOrmModule } from './libs/entity/getMysqlTypeOrmModule';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [getMysqlTypeOrmModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
