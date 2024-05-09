import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMysqlTypeOrmModule } from './libs/entity/getMysqlTypeOrmModule';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './api/v1/v1.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './libs/common-config/res/response.interceptor';
import { AllExceptionsFilter } from './libs/common-config/filter/http-exception.filter';

@Module({
    imports: [
        getMysqlTypeOrmModule,
        ConfigModule.forRoot({ isGlobal: true }),
        V1Module,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
