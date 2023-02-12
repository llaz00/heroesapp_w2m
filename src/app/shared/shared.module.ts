import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenrePipe } from './pipes/genre.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ConfirmationDialogComponent, GenrePipe],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    exports: [GenrePipe],
})
export class SharedModule {}
