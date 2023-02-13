import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../environments/environment';
import { MockApiInterceptor } from './interceptors/mock-api.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const mockApiInterceptor: Provider[] = environment.mockApi
    ? [{ provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true }]
    : [];
@NgModule({
    declarations: [AppComponent, BaseLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        CdkDropList,
        MatListModule,
        HttpClientModule,
        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        ...mockApiInterceptor,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
