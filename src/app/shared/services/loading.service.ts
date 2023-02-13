import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    // We store the senderId for if another service sets isLoading to true and finishes before the first one (or viceversa)
    private loadingStatuses$ = new BehaviorSubject<{ senderId: number; isLoading: boolean }[]>([]);

    getIsLoading(): Observable<boolean> {
        // Prevents calling next and completing subject from outside // maps to isLoading field
        return this.loadingStatuses$
            .asObservable()
            .pipe(map(statuses => statuses.some(status => status.isLoading)));
    }

    setIsLoading(senderId: number, newStatus: boolean): void {
        const loadingStatuses = this.loadingStatuses$.getValue();

        const statusIndex = loadingStatuses.findIndex(status => status.senderId === senderId);

        if (statusIndex !== -1) {
            loadingStatuses[statusIndex].isLoading = newStatus;
        }

        loadingStatuses.push({
            senderId,
            isLoading: newStatus,
        });

        this.loadingStatuses$.next(loadingStatuses);
    }
}
