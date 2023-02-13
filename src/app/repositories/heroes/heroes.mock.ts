import { Observable, of } from 'rxjs';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { HeroModel } from '../../models/hero.model';
import { ApiResponseModel } from '../../models/api-response.model';

export default {
    heroes: {
        handler: handler,
    },
};

const heroesList: HeroModel[] = [
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

function handler(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const urlParts = request.url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const lastPartNumber = parseInt(lastPart);

    switch (request.method) {
        case 'GET':
            if (!isNaN(lastPartNumber)) {
                return getSingle(lastPartNumber);
            }
            return getAll(request.params.get('search') || undefined);
        case 'PUT':
            return edit(lastPartNumber, request.body as HeroModel);
        case 'DELETE':
            return remove(lastPartNumber);
        case 'POST':
            return create(request.body as HeroModel);
    }

    return of(
        new HttpResponse({
            status: 404,
            body: 'Not found',
        })
    );
}

function getSingle(id: number): Observable<HttpResponse<HeroModel | string>> {
    const hero = heroesList.find(hero => hero.id === id);

    if (hero) {
        return of(
            new HttpResponse({
                status: 200,
                body: hero,
            })
        );
    }
    return of(
        new HttpResponse({
            status: 404,
            body: 'Not found',
        })
    );
}

function getAll(search?: string): Observable<HttpResponse<ApiResponseModel<HeroModel>>> {
    if (search) {
        const filteredResults = heroesList.filter(
            hero =>
                hero.name.toLowerCase().includes(search.toLowerCase()) ||
                hero.publisher?.toLowerCase().includes(search.toLowerCase())
        );

        return of(
            new HttpResponse({
                status: 200,
                body: {
                    data: [...filteredResults],
                    length: filteredResults.length,
                },
            })
        );
    }

    return of(
        new HttpResponse({
            status: 200,
            body: {
                data: [...heroesList],
                length: heroesList.length,
            },
        })
    );
}

function edit(id: number, newObject: HeroModel): Observable<HttpResponse<void | string>> {
    const oldHeroIndex = heroesList.findIndex(hero => hero.id === id);

    if (oldHeroIndex !== -1) {
        heroesList[oldHeroIndex] = {
            ...newObject,
            id: oldHeroIndex,
        };

        return of(
            new HttpResponse({
                status: 200,
                body: undefined,
            })
        );
    } else {
        return of(
            new HttpResponse({
                status: 404,
                body: 'Not found',
            })
        );
    }
}

function remove(id: number): Observable<HttpResponse<void | string>> {
    const oldIndex = heroesList.findIndex(hero => hero.id === id);
    if (oldIndex !== -1) {
        heroesList.splice(oldIndex, 1);
        return of(
            new HttpResponse({
                status: 200,
                body: undefined,
            })
        );
    }
    return of(
        new HttpResponse({
            status: 404,
            body: 'Not found',
        })
    );
}

function create(object: HeroModel): Observable<HttpResponse<number>> {
    const newId = getLastIndex();
    heroesList.push({
        ...object,
        id: newId,
    });

    return of(
        new HttpResponse({
            status: 200,
            body: newId,
        })
    );
}

function getLastIndex(): number {
    const idList = heroesList.map(hero => hero.id);
    const maxId = Math.max(...idList);

    return maxId + 1;
}
