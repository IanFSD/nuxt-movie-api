/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieTrendingEntity, TRENDING_TYPE } from './entities/movie-trending.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieTrendingEntity)
    private readonly movieRepository: Repository<MovieTrendingEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createOneTrending(dto:CreateMovieDto){
    try{
      if(dto){
       // await this.movieRepository.save(dto);
      }
    }catch(e){

    }
  }

  async findAllTrending(): Promise<MovieTrendingEntity[]> {
    return await this.movieRepository.find();
  }

  async findOneTrending(id: number) {
    return await this.movieRepository.findOne({where: {id: id}})
  }

  async remove(id: number) {
    try{
      const entity = await this.movieRepository.findOneByOrFail({id: id})
      return await this.movieRepository.remove(entity);
    } catch (err) {
      console.error(err);
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async updateMoviesTrendingWeek() {
    console.log('Running scheduled task...');
    // Delete all trending movies from the weekly table
    await this.movieRepository.delete({trending_type: TRENDING_TYPE.WEEK});

    // Fetch and insert new data
    const moviesData = await this.fetchMoviesTrending();
    for(const movieData of moviesData.results){
      await this.movieRepository.save({
        adult:movieData.adult,
        movie_id: movieData.id,
        original_language: movieData.original_language,
        overview: movieData.overview,
        backdrop_path: movieData.backdrop_path,
        original_title: movieData.original_title,
        release_date: movieData.release_date,
        title: movieData.title,
        poster_path: movieData.poster_path,
        trending_type: TRENDING_TYPE.WEEK,
      })
    }
    return console.log('Scheduled task completed.');;
    
  }

  async fetchMoviesTrending(){
    const url = `${process.env.MOVIE_DB_URL}trending/movie/week?api_key=${process.env.MOVIE_DB_API_KEY}`;
    try {
      console.log(111111111111111)
      const response = await this.httpService.axiosRef.get(url,{
        headers: { 
          'Authorization': 'Bearer ' + process.env.MOVIE_DB_API_KEY
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch trending movies: ${error.message}`);
    }
  }
}
