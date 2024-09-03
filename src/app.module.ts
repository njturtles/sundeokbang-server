import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMysqlTypeOrmModule } from './getMysqlTypeOrmModule';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './api/v1/v1.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './libs/common/res/response.interceptor';
import { AllExceptionsFilter } from './libs/common/filter/http-exception.filter';
import { ContextMiddleware } from './libs/middleware/request-context/context.middleware';
import { validate } from './libs/env/env.validation';

@Module({
    imports: [
        getMysqlTypeOrmModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            validate,
        }),
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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ContextMiddleware).forRoutes('*');
    }
}
