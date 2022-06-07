import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sesion } from 'src/app/models/sesion';

@Component({
  selector: 'app-crear-sesion',
  templateUrl: './crear-sesion.component.html',
  styleUrls: ['./crear-sesion.component.css']
})
export class CrearSesionComponent implements OnInit {
  sesionForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { 
    this.sesionForm = this.fb.group({
      exerciseToDo: ['', Validators.required],
      aproxTotalDuration: ['', Validators.required],
      actualTotalDuration: ['', Validators.required],
      date: ['', Validators.required],
      emotions: ['', Validators.required],
      moans: ['', Validators.required],
      heartbeats: ['', Validators.required],
      comments: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarSesion(){
    console.log(this.sesionForm);

    const SESION: Sesion = {
      exerciseToDo: this.sesionForm.get('exerciseToDo')?.value,
      aproxTotalDuration: this.sesionForm.get('aproxTotalDuration')?.value,
      actualTotalDuration: this.sesionForm.get('actualTotalDuration')?.value,
      date: this.sesionForm.get('date')?.value,
      emotions: this.sesionForm.get('emotions')?.value,
      moans: this.sesionForm.get('moans')?.value,
      heartbeats: this.sesionForm.get('heartbeats')?.value,
      comments: this.sesionForm.get('comments')?.value
    }
    console.log(SESION);
    this.toastr.success('La sesión ha sido registrada con éxito', 'Sesión Registrada');
    this.router.navigate(['/ver-paciente']);
  }

}
