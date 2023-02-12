import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenrePipe } from './pipes/genre.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
    declarations: [ConfirmationDialogComponent, GenrePipe, UppercaseDirective, UppercaseDirective],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    exports: [GenrePipe, UppercaseDirective],
})
export class SharedModule {}
