import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit {
    isSidebarOpened = true;
    isMobile = false;
    isLoading = false;

    constructor(private loadingService: LoadingService) {
        if (window.innerWidth <= 600) {
            this.isSidebarOpened = this.isSidebarOpened = false;
            this.updateIsMobile();
        }
    }

    ngOnInit(): void {
        this.loadingService.getIsLoading().subscribe(isLoading => (this.isLoading = isLoading));
    }

    @HostListener('window:resize', ['$event'])
    updateIsMobile(): void {
        this.isMobile = window.innerWidth <= 600;
    }
}
