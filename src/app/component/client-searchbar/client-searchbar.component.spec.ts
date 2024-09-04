import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchbarComponent } from './client-searchbar.component';

describe('ClientSearchbarComponent', () => {
  let component: ClientSearchbarComponent;
  let fixture: ComponentFixture<ClientSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSearchbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
