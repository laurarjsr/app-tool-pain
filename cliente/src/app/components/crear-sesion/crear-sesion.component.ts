import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FaceApiService } from 'src/app/face-api.service';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';
import { VideoPlayerService } from 'src/app/video-player.service';
import * as _ from 'lodash';
import { MoansRecognitionService } from 'src/app/moans-recognition.service';

@Component({
  selector: 'app-crear-sesion',
  templateUrl: './crear-sesion.component.html',
  styleUrls: ['./crear-sesion.component.css']
})
export class CrearSesionComponent implements OnInit, OnDestroy {
  sesionForm: FormGroup;
  titulo = 'Crear Sesión';
  id: string | null;

  //---Variables para la detección de las emociones---
  public currentStream: any;
  public dimensionVideo: any;
  listEvents: Array<any> = [];
  listExpressions: any = [];

  //---Variables para la detección de quejidos---
  listRecognitions: string[] = [];
  //Creamos un diccionario clave-valor para poder asociar a los quejidos que se detecten la hora exacta en la que se dijeron, siendo el quejido la clave y el valor la fecha actual
  moansAndDate = new Map();

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _sesionService: SesionService, private aRouter: ActivatedRoute, private faceApiService: FaceApiService, private render: Renderer2, private elementRef: ElementRef, private videoPlayerService: VideoPlayerService, private speech: MoansRecognitionService) {
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
    //Obtenemos el ID de la sesión:
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.listenerEvents();
    this.esEditar();
    this.checkMediaSource();
    this.getSizeCam();
  }

  ngOnDestroy(): void {
    //Nos desubcribimos de todos los eventos, recorremos el array de eventos listEvents
    this.listEvents.forEach(event => event.unsubscribe());
  }

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

    if (this.id !== null) {
      //editamos sesion
      this._sesionService.editarSesion(this.id, SESION).subscribe(data => {
        this.toastr.info('El sesion fue actualizado con éxito!', 'Sesión actualizada');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.sesionForm.reset();
      })
    } else {
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
  }

  esEditar() {
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
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
      }).catch(() => {
        console.log('Oh, no se tiene permisos para acceder a la cámara :(');
      });

    } else {
      console.log('No se han encontrado dispositivos :(');
    }
  };

  getSizeCam = () => {
    //Cogemos el div cam de app.component.html:
    const elementCam: HTMLElement = document.querySelector('.cam');
    //Cogemos el alto y el ancho del div cam:
    const { width, height } = elementCam.getBoundingClientRect();
    //Guardamos esas dimensiones en una variable para despues aplicar ese alto y ese ancho en el componente del video player en app.component.html
    this.dimensionVideo = { width, height };
  };

  //Función que escucha los eventos
  listenerEvents = () => {
    //Nos subscribimos al evento de callback 
    const observer1$ = this.videoPlayerService.cbAi
      .subscribe(({ resizedDetections, displaySize, expressions, videoElement }) => {
        resizedDetections = resizedDetections[0] || null;
        //Crearemos un canvas en cuanto se detecte la cara:
        if (resizedDetections) {
          //En vez de obtener las expresiones en formato llave-valor hacemos un mapeo "guardando" así el nombre de la expresión dentro de "name" y el valor de la expresión dentro de "value". Esto nos facilitará el manejo de la lista de las emociones:
          this.listExpressions = _.map(expressions, (value, name) => {
            return {name, value};
          });
        }
      });

    const observer2$ = this.speech.record('es_ES')
    .subscribe(e => {
      this.listRecognitions.push(e);
      const date = new Date();
      for (let i = 0; i < this.listRecognitions.length; i++) {
        this.moansAndDate.set(this.listRecognitions[i], date);
      }
      console.log(this.moansAndDate);
    })
    this.listEvents = [observer1$, observer2$];
  };

}
