/* eslint-disable prettier/prettier */
import { GenreEntity } from "src/genres/entities/genre.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum TRENDING_TYPE {
    WEEK= "week",
    DAY= "day",
}


@Entity('movie-trending')
export class MovieTrendingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,unique: true})
    movie_id: number;

    @Column({nullable: false, length: 128})
    original_title: string;

    @Column({nullable: false, length: 128})
    title: string;

    @Column({})
    adult: boolean;

    @Column()
    trending_type: TRENDING_TYPE

    @Column({nullable: false, length: 128})
    backdrop_path: string;

    @Column({nullable: false, length: 128})
    original_language: string;

    @Column({nullable: false, type:'text'})
    overview: string;

    @Column({nullable: false, length: 128})
    poster_path: string;

    @Column({nullable: false, length: 128})
    release_date: string;


    @OneToMany(() => MovieTrendingEntity, item => item.Genres)
    @JoinColumn([{name: 'id', referencedColumnName: 'genres_ids'}])
    Genres: GenreEntity[];
} 