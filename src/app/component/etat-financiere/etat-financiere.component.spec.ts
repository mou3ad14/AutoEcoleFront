import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatFinanciereComponent } from './etat-financiere.component';

describe('EtatFinanciereComponent', () => {
  let component: EtatFinanciereComponent;
  let fixture: ComponentFixture<EtatFinanciereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatFinanciereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatFinanciereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
