/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  createTrending(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createOneTrending(createMovieDto);
  }

  @Get()
  findAllTrending() {
    return this.moviesService.findAllTrending();
  }

  @Get(':id')
  findOneTrending(@Param('id') id: string) {
    return this.moviesService.findOneTrending(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  @Get('trending/week')
  updateMoviesTrendingWeek(){
    return this.moviesService.updateMoviesTrendingWeek();
  }
}
