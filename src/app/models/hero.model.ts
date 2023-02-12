import { GenreModel } from './genre.model';

export interface HeroModel {
    id: number;
    name: string;
    publisher?: string;
    genre?: GenreModel;
}
