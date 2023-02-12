import { Component, OnInit } from '@angular/core';
import { ApiResponseModel } from '../../../models/api-response.model';
import { HeroModel } from '../../../models/hero.model';
import { HeroesService } from '../../../services/heroes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-heroes-list',
    templateUrl: './heroes-list.component.html',
    styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
    heroesList: ApiResponseModel<HeroModel> = { data: [], length: 0 };
    columns = ['name', 'publisher', 'genre', 'delete'];

    constructor(
        private heroesService: HeroesService,
        private router: Router,
        private dialog: MatDialog,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getAllHeroes();
    }

    getAllHeroes(): void {
        this.heroesService.getAll().subscribe(heroes => {
            this.heroesList = heroes;
        });
    }

    edit(id: number) {
        void this.router.navigateByUrl(`/heroes/edit/${id}`);
    }

    create(): void {
        void this.router.navigateByUrl('/heroes/create');
    }

    delete(id: number): void {
        const dialog = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Eliminar héroe',
                description: '¿Seguro que quieres eliminar el héroe?',
            },
        });

        dialog.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.heroesService.delete(id).subscribe(() => {
                    this.snackbar.open('Eliminado correctamente');

                    this.getAllHeroes();
                });
            }
        });
    }
}
