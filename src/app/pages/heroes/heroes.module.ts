import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { HeroesListComponent } from './list/heroes-list.component';
import { HeroesEditComponent } from './edit/heroes-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
  {
    path: 'create',
    component: HeroesEditComponent
  },
  {
    path: 'edit/:id',
    component: HeroesEditComponent
  }
]
@NgModule({
  declarations: [
    HeroesListComponent,
    HeroesEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HeroesModule { }
