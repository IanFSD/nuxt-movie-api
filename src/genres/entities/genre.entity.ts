/* eslint-disable prettier/prettier */
import { MovieTrendingEntity } from "src/movies/entities/movie-trending.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('genre')
export class GenreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,unique: true})
    genre_id: number;

    @Column({nullable: false, length: 128})
    name: string;

    @ManyToOne(() => MovieTrendingEntity, item => item.Genres, {nullable: true})
    @JoinColumn([{name: 'id', referencedColumnName: 'genres_ids'}])
    Movie: MovieTrendingEntity;
}
