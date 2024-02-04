/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmPostgresConfig } from './resources/database.configuration.service';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmPostgresConfig)
    ,MoviesModule, GenresModule],
      
  providers: [AppService],
})
export class AppModule {}
