import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string },
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>
    ) {}

    close(confirmAction: boolean) {
        this.dialogRef.close(confirmAction);
    }
}
