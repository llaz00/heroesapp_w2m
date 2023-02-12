import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { Observable, of } from 'rxjs';
import { ApiResponseModel } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    heroesList: HeroModel[] = [
        {
            id: 1,
            name: 'Superman',
        },
        {
            id: 2,
            name: 'Spiderman',
            publisher: 'Marvel',
            genre: 'male',
        },
    ];
    constructor(private http: HttpClient) {}

    get(id: number): Observable<HeroModel> {
        const hero = this.heroesList.find(hero => hero.id === id);

        if (hero) {
            return of(hero);
        }
        throw new Error('Hero not found');
    }

    getAll(searchFilter?: string): Observable<ApiResponseModel<HeroModel>> {
        // TODO: Search filter
        return of({
            data: [...this.heroesList],
            length: this.heroesList.length,
        });
    }

    edit(id: number, newObject: HeroModel): Observable<void> {
        const oldHeroIndex = this.heroesList.findIndex(hero => hero.id === id);

        if (oldHeroIndex !== -1) {
            this.heroesList[oldHeroIndex] = {
                ...newObject,
                id: oldHeroIndex,
            };

            return of(void 0);
        } else {
            throw new Error('Old hero not found');
        }
    }

    delete(id: number): Observable<void> {
        const oldIndex = this.heroesList.findIndex(hero => hero.id === id);
        if (oldIndex) {
            this.heroesList.splice(oldIndex, 1);
            return of(void 0);
        }
        throw new Error('Hero not found');
    }

    create(object: HeroModel): Observable<number> {
        const newId = this.getLastIndex();
        this.heroesList.push({
            ...object,
            id: newId,
        });
        return of(newId);
    }

    private getLastIndex(): number {
        const idList = this.heroesList.map(hero => hero.id);
        const maxId = Math.max(...idList);

        return maxId + 1;
    }
}
