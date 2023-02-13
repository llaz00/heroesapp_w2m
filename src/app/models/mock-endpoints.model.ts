import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest } from '@angular/common/http';

export interface MockEndpointsModel {
    [key: string]: {
        handler: (request: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>;
    };
}
