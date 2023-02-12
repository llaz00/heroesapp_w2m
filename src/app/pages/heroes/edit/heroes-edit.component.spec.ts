import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesEditComponent } from './heroes-edit.component';

describe('HeroesEditComponent', () => {
    let component: HeroesEditComponent;
    let fixture: ComponentFixture<HeroesEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeroesEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
