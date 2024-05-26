import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import * as httpContext from 'express-http-context';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const env = app.get(ConfigService);
    const port = env.get('APP_PORT');

    app.use(cookieParser());

    app.enableCors({ credentials: true });
    app.use(httpContext.middleware);

    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(port);
}
bootstrap();
