import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSesionComponent } from './crear-sesion.component';

describe('CrearSesionComponent', () => {
  let component: CrearSesionComponent;
  let fixture: ComponentFixture<CrearSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
