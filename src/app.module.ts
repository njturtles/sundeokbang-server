import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMysqlTypeOrmModule } from './libs/entity/getMysqlTypeOrmModule';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './api/v1/v1.module';
import { V1Controller } from './api/v1/v1.controller';

@Module({
  imports: [
    getMysqlTypeOrmModule,
    ConfigModule.forRoot({ isGlobal: true }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
