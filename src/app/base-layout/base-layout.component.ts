import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent {
    isSidebarOpened = true;
    isMobile = false;

    constructor() {
        if (window.innerWidth <= 600) {
            this.isSidebarOpened = this.isSidebarOpened = false;
            this.updateIsMobile();
        }
    }

    @HostListener('window:resize', ['$event'])
    updateIsMobile(): void {
        this.isMobile = window.innerWidth <= 600;
    }
}
