/* eslint-disable prettier/prettier */
import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'


export class CreateMovieDto {
        @ApiProperty()
        @IsNotEmpty()
        title: string;

        @ApiProperty()
        @IsNotEmpty()
        movie_id: string;
}
