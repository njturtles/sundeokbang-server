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

    const allowedOrigins = [
        'http://localhost:3000',
        'https://api.dev.borangkkae.com',
    ];

    app.use(cookieParser());

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });

    app.use(httpContext.middleware);

    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(port);
}
bootstrap();
