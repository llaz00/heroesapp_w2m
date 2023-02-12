import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './list/heroes-list.component';
import { HeroesEditComponent } from './edit/heroes-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
    {
        path: '',
        component: HeroesListComponent,
    },
    {
        path: 'create',
        component: HeroesEditComponent,
    },
    {
        path: 'edit/:id',
        component: HeroesEditComponent,
    },
];
@NgModule({
    declarations: [HeroesListComponent, HeroesEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        SharedModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
})
export class HeroesModule {}
