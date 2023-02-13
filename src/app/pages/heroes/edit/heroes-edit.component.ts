import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreModel } from '../../../models/genre.model';
import { HeroesService } from '../../../repositories/heroes/heroes.service';
import { catchError, throwError } from 'rxjs';

interface HeroForm {
    id: FormControl<number>;
    name: FormControl<string>;
    genre: FormControl<GenreModel | undefined>;
    publisher: FormControl<string | undefined>;
}

@Component({
    selector: 'app-heroes-edit',
    templateUrl: './heroes-edit.component.html',
    styleUrls: ['./heroes-edit.component.scss'],
})
export class HeroesEditComponent implements OnInit {
    isEditMode = false;
    heroForm: FormGroup<HeroForm>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private heroesService: HeroesService,
        private snackbar: MatSnackBar
    ) {
        this.heroForm = new FormGroup<HeroForm>({
            id: new FormControl(-1, { nonNullable: true }),
            name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            genre: new FormControl(undefined, { nonNullable: true }),
            publisher: new FormControl(undefined, { nonNullable: true }),
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id: string = params['id'];
            if (id) {
                const parsedId = parseInt(id);

                if (!isNaN(parsedId)) {
                    this.isEditMode = true;

                    this.getHeroData(parsedId);
                } else {
                    this.snackbar.open('El héroe solicitado no es correcto');
                    void this.router.navigateByUrl('/heroes');
                }
            }
        });
    }

    getHeroData(id: number): void {
        this.heroesService
            .get(id)
            .pipe(
                catchError(err => {
                    this.snackbar.open('Ha habido un error al cargar el héroe solicitado');
                    void this.router.navigateByUrl('/heroes');
                    return throwError(err);
                })
            )
            .subscribe(hero => {
                this.heroForm.patchValue(hero);
            });
    }

    goBack(): void {
        void this.router.navigateByUrl('/heroes');
    }

    save(): void {
        if (this.heroForm.invalid) {
            this.heroForm.markAsTouched();
        } else {
            if (this.isEditMode) {
                this.heroesService
                    .edit(this.heroForm.controls.id.value, this.heroForm.getRawValue())
                    .pipe(
                        catchError(err => {
                            this.snackbar.open('Error al guardar');
                            return throwError(err);
                        })
                    )
                    .subscribe(() => {
                        this.snackbar.open('Editado correctamente');
                        void this.router.navigateByUrl('/heroes');
                    });
            } else {
                this.heroesService
                    .create(this.heroForm.getRawValue())
                    .pipe(
                        catchError(err => {
                            this.snackbar.open('Error al crear');
                            return throwError(err);
                        })
                    )
                    .subscribe(() => {
                        this.snackbar.open('Creado correctamente');
                        void this.router.navigateByUrl('/heroes');
                    });
            }
        }
    }
}
