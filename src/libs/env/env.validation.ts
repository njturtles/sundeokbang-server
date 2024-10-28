import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, validateSync } from 'class-validator';
import { Transform } from 'class-transformer';

enum Environment {
    Local = 'local',
    Dev = 'dev',
    Prod = 'prod',
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    APP_PORT: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    DB_PORT: number;

    @IsString()
    DB_HOST: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_DATABASE: string;

    @IsString()
    KAKAO_REST_API_KEY: string;

    @IsString()
    KAKAO_CLIENT_SECRET: string;

    @IsString()
    KAKAO_REDIRECT_URI: string;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    JWT_EXPIRES_IN: string;

    @IsString()
    COOKIE_NAME: string;

    @IsString()
    COOKIE_DOMAIN: string;

    @IsString()
    AWS_ACCESS_KEY_ID: string;

    @IsString()
    AWS_ACCESS_KEY_SECRET: string;

    @IsString()
    AWS_S3_ENDPOINT: string;

    @IsString()
    AWS_S3_IMAGE_REGION: string;

    @IsString()
    NAVER_MAP_URL: string;

    @IsString()
    NAVER_MAP_APIKEY_ID: string;

    @IsString()
    NAVER_MAP_APIKEY: string;

    @IsString()
    OPENAI_API_KEY: string;

    @IsString()
    ASSISTANT_ID: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(
            `Configuration validation error: ${errors
                .map((err) => Object.values(err.constraints).join(', '))
                .join('; ')}`,
        );
    }
    return validatedConfig;
}
