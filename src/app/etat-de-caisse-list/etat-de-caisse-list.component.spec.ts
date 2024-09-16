import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatDeCaisseListComponent } from './etat-de-caisse-list.component';

describe('EtatDeCaisseListComponent', () => {
  let component: EtatDeCaisseListComponent;
  let fixture: ComponentFixture<EtatDeCaisseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatDeCaisseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatDeCaisseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
