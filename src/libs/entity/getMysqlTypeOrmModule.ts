import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const getMysqlTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (env: ConfigService): Promise<DataSourceOptions> => ({
    type: 'mysql',
    host: env.get<string>('DB_HOST'),
    port: env.get<number>('DB_PORT'),
    username: env.get<string>('DB_USERNAME'),
    password: env.get<string>('DB_PASSWORD'),
    database: env.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
});
