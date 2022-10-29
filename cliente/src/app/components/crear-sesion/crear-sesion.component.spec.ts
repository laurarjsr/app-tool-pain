import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrearSesionComponent } from './crear-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('CrearSesionComponent', () => {
  let component: CrearSesionComponent;
  let fixture: ComponentFixture<CrearSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSesionComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot()]
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
