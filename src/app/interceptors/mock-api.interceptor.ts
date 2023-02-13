import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockEndpoints } from '../repositories/mock.export';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const currentMockEndpoint = mockEndpoints[this.extractServiceName(request.url)] || null;

        return currentMockEndpoint ? currentMockEndpoint.handler(request) : next.handle(request);
    }

    private extractServiceName(currentUrl: string): string {
        try {
            // VALID URL (ex. 'https://domain.com/api/service/...')
            const url = new URL(currentUrl);
            const pathName = url.pathname;
            const serviceName = pathName.split('/')[2];
            return serviceName;
        } catch {
            // INVALID URL (ex. 'mockapi')
            return currentUrl.split('/')[1];
        }
    }
}
