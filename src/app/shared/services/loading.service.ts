import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private isLoading = new BehaviorSubject<{ senderId: number; isLoading: boolean }>({
        senderId: 0,
        isLoading: false,
    });

    getIsLoading(): Observable<boolean> {
        // Prevents calling next and completing subject from outside // maps to isLoading field
        return this.isLoading.asObservable().pipe(map(loading => loading.isLoading));
    }

    setIsLoading(senderId: number, newStatus: boolean): void {
        if (newStatus) {
            this.isLoading.next({ senderId, isLoading: newStatus });
        } else if (senderId === this.isLoading.getValue().senderId) {
            // Only same senderId can finish loading
            this.isLoading.next({ senderId, isLoading: newStatus });
        }
    }
}
