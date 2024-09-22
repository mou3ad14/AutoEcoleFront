import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProbableFormComponent } from './client-probable-form.component';

describe('ClientProbableFormComponent', () => {
  let component: ClientProbableFormComponent;
  let fixture: ComponentFixture<ClientProbableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProbableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProbableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
