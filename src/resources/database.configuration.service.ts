/* eslint-disable prettier/prettier */
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { MovieTrendingEntity } from 'src/movies/entities/movie-trending.entity';
import {LoggerOptions} from 'typeorm/logger/LoggerOptions';

const DB_LOGGING = process.env.DB_LOGGING

const DEFAULTS = {
    synchronize: true,
    logging: DB_LOGGING as LoggerOptions
};


export const typeOrmPostgresConfig: TypeOrmModuleOptions = {
    ...DEFAULTS,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'nutflix',
    password: 'password',
    database: process.env.DB_DATABASE,
    // logger: new DatabaseLogger(),
    maxQueryExecutionTime: Number(process.env.DB_MAXQUERYEXECUTIONTIME),
    name: 'default',
    entities: [MovieTrendingEntity],
    retryAttempts: 999999,
};
