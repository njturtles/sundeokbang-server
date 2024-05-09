import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const env = app.get(ConfigService);
    const port = env.get('APP_PORT');

    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(port);
}
bootstrap();
