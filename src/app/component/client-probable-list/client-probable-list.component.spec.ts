import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProbableListComponent } from './client-probable-list.component';

describe('ClientProbableListComponent', () => {
  let component: ClientProbableListComponent;
  let fixture: ComponentFixture<ClientProbableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProbableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProbableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
