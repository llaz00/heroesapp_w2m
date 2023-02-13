import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HeroModel } from '../../models/hero.model';
import { environment } from '../../../environments/environment';
import { ApiResponseModel } from '../../models/api-response.model';

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    constructor(private http: HttpClient) {}

    get(id: number): Observable<HeroModel> {
        return this.http.get<HeroModel>(`${environment.apiUrl}/heroes/${id}`);
    }

    getAll(searchFilter?: string): Observable<ApiResponseModel<HeroModel>> {
        let params = new HttpParams();
        if (searchFilter) {
            params = params.set('search', searchFilter);
        }
        return this.http.get<ApiResponseModel<HeroModel>>(`${environment.apiUrl}/heroes`, {
            params,
        });
    }

    edit(id: number, newObject: HeroModel): Observable<void> {
        return this.http.put<void>(`${environment.apiUrl}/heroes/${id}`, newObject);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/heroes/${id}`);
    }

    create(object: HeroModel): Observable<number> {
        return this.http.post<number>(`${environment.apiUrl}/heroes`, object);
    }
}
