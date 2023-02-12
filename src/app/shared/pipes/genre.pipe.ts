import { Pipe, PipeTransform } from '@angular/core';
import { GenreModel } from '../../models/genre.model';

@Pipe({
    name: 'genre',
})
export class GenrePipe implements PipeTransform {
    transform(value: GenreModel): string {
        switch (value) {
            case 'male':
                return 'Masculino';
            case 'female':
                return 'Femenino';
            case 'other':
                return 'Otro';
        }
    }
}
