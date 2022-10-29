import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VerPacienteComponent } from './ver-paciente.component';
import { ToastrModule } from 'ngx-toastr';

describe('VerPacienteComponent', () => {
  let component: VerPacienteComponent;
  let fixture: ComponentFixture<VerPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPacienteComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
