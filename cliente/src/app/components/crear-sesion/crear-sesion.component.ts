import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-crear-sesion',
  templateUrl: './crear-sesion.component.html',
  styleUrls: ['./crear-sesion.component.css']
})
export class CrearSesionComponent implements OnInit {
  sesionForm: FormGroup;
  titulo = 'Crear Sesión';
  id: string | null;

  public currentStream: any;

  

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _sesionService: SesionService, private aRouter: ActivatedRoute) {
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
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    //this.esEditar();
    this.checkMediaSource();
  }

  /*agregarSesion() {
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

    if(this.id !== null){
      //editamos sesion
      this._sesionService.editarSesion(this.id, SESION).subscribe(data => {
        this.toastr.info('El sesion fue actualizado con éxito!', 'Sesión actualizada');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.sesionForm.reset();
      })
    }else{
      //agregamos sesión
      console.log(SESION);
    this._sesionService.guardarSesion(SESION).subscribe(data => {
      this.toastr.success('La sesion fue registrada con éxito!', 'Sesión registrada');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.sesionForm.reset();
    })
    }
  }*/

  agregarSesion() {
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
    //agregamos sesión
    console.log(SESION);
    this._sesionService.guardarSesion(SESION).subscribe(data => {
      this.toastr.success('La sesion fue registrada con éxito!', 'Sesión registrada');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.sesionForm.reset();
    })

  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
      }).catch(() => {
        console.log('**** ERROR NOT PERMISSIONS *****');
      });

    } else {
      console.log('******* ERROR NOT FOUND MEDIA DEVICES');
    }
  };
  

  

  /*esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar sesión';
      this._sesionService.obtenerSesion(this.id).subscribe(data => {
        this.sesionForm.setValue({
          exerciseToDo: data.exerciseToDo,
          aproxTotalDuration: data.aproxTotalDuration,
          actualTotalDuration: data.actualTotalDuration,
          date: data.date,
          emotions: data.emotions,
          moans: data.moans,
          heartbeats: data.heartbeats,
          comments: data.comments
        })
      })
    }
  }*/


}
