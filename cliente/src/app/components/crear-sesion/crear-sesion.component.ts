/// <reference types="web-bluetooth" />
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FaceApiService } from 'src/app/face-api.service';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';
import { VideoPlayerService } from 'src/app/video-player.service';
import * as _ from 'lodash';
import { MoansRecognitionService } from 'src/app/moans-recognition.service';
// const MiBand = require('miband');
declare var MiBand: any;
import * as MiBand from 'miband';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-sesion',
  templateUrl: './crear-sesion.component.html',
  styleUrls: ['./crear-sesion.component.css']
})
export class CrearSesionComponent implements OnInit, OnDestroy {
  sesionForm: FormGroup;
  titulo = 'Crear Sesión';
  id: string | null;
  sesionData: Sesion;

  //---Variables para la detección de las emociones---
  public currentStream: any;
  public dimensionVideo: any;
  listEvents: Array<any> = [];
  listExpressions: any = [];

  //---Variables para la detección de quejidos - Segunda versión, de momento la elegida---
  //La idea es crear arrays asociados a cada quejido y en cada array guardar las horas en las que se dicen, de tal manera que para cada quejido tendríamos un array con los instantes temporales en lo que han sido pronunciados.
  ay: Date[] = [];
  meDuele: Date[] = [];
  para: Date[] = [];
  noPuedoMas: Date[] = [];
  noAguanto: Date[] = [];
  noPuedoSeguir: Date[] = [];

  intervaloTiempoEmocionesID: any;
  intervaloTiempoQuejidosID: any;

  //Variable para almacenar los comentarios junto con la hora
  listComments: any = [];



  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _sesionService: SesionService, private aRouter: ActivatedRoute, private faceApiService: FaceApiService, private render: Renderer2, private elementRef: ElementRef, private videoPlayerService: VideoPlayerService, private speech: MoansRecognitionService) {
    this.sesionForm = this.fb.group({
      exerciseToDo: ['', Validators.required],
      aproxTotalDuration: ['', Validators.required],
      actualTotalDuration: ['', Validators.required],
      date: ['', Validators.required],
      // emotions: ['', Validators.required],
      // moans: ['', Validators.required],
      // heartbeats: ['', Validators.required],
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
    // this.detectarPulsaciones();

    // this.conectarPulsera();
    // const MiBand = require('miband');
    //   const device = await navigator.bluetooth.requestDevice({
    //     filters: [
    //       { services: [ MiBand.advertisementService ] }
    //     ],
    //     optionalServices: MiBand.optionalServices
    //   });
      
    // const server = await device.gatt.connect();
    // console.log('Pulsera conectada');
    
    // let miband = new MiBand(server);
    // await miband.init();
    
    // // console.log('Notifications demo...');
    // // await miband.showNotification('message');
    // miband.on('heart_rate', (rate) => {
    //   console.log('Heart Rate:', rate)
    // })
    // await miband.hrmStart();
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
      emotions: this.listExpressions,
      moans: {
        ay: this.ay,
        meDuele: this.meDuele,
        para: this.para,
        noAguanto: this.noAguanto,
        noPuedoMas: this.noPuedoMas,
        noPuedoSeguir: this.noPuedoSeguir
      },
      heartbeats:[], 
      comments: this.listComments
    }

    if (this.id !== null) {
      //editamos sesion
      this._sesionService.editarSesion(this.id, SESION).subscribe(data => {
        this.toastr.info('¡El sesión fue actualizada con éxito!', 'Sesión actualizada');
        this.router.navigate(['/ver-paciente']);
      }, error => {
        console.log(error);
        this.sesionForm.reset();
      })
    } else {
      //agregamos sesión
      console.log(SESION);
      this._sesionService.guardarSesion(SESION).subscribe(data => {
        this.toastr.success('¡La sesión fue registrada con éxito!', 'Sesión registrada');
        this.router.navigate(['/ver-paciente']);
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
        this.sesionData = data;
        var editDate = moment.utc(data.date).format('YYYY-MM-DD');
        console.log(editDate);
        this.sesionForm.setValue({
          exerciseToDo: data.exerciseToDo,
          aproxTotalDuration: data.aproxTotalDuration,
          actualTotalDuration: data.actualTotalDuration,
          date: editDate,
          // emotions: data.emotions,
          // moans: data.moans,
          // heartbeats: data.heartbeats,
          comments: []
        })
        console.log(data.comments)
        //Guardamos las emociones que ya había para no machacar el valor previo
        this.listExpressions = data.emotions;

        //Guardamos los quejidos que ya había para no machacar el valor previo
        this.ay = data.moans.ay.map((date) => {return new Date(date)});
        this.meDuele = data.moans.meDuele.map((date) => {return new Date(date)});
        this.para = data.moans.para.map((date) => {return new Date(date)});
        this.noAguanto = data.moans.noAguanto.map((date) => {return new Date(date)});
        this.noPuedoMas = data.moans.noPuedoMas.map((date) => {return new Date(date)});
        this.noPuedoSeguir = data.moans.noPuedoSeguir.map((date) => {return new Date(date)});

        //Guardamos los comentarios que ya había para no machacar el valor previo
        this.listComments = data.comments.map((comment) => {comment.fecha = new Date(comment.fecha); return comment;});
      })
    }
  }

  //Función que guarda los comentarios junto con la hora
  publicarComentarios() {
    //La hora de la nota será 6 segundos menos que la hora actual para restarle el tiempo que se tarda en escribir una breve nota
    var fechaActual = new Date();
    var segundosFechaActual = fechaActual.getTime();
    var retrocederSegundos = 6000;
    var comments = {
      "nota": this.sesionForm.get('comments')?.value,
      "fecha": new Date(segundosFechaActual - retrocederSegundos)
    };
    this.listComments.push(comments);
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
          // this.listExpressions = _.map(expressions, (value, name) => {
          //   return { name, value };
          // });

          //Añadimos al array de las emociones un atributo para la fecha
          expressions.fecha = new Date();
          //Para que no se almacene un volumen de datos tan grande guardamos las expresiones cada 5 sec
          setInterval(
            this.listExpressions.push(expressions),
            5000
          );
          console.log(this.listExpressions);
        }
      });

    const observer2$ = this.speech.record('es_ES')
      .subscribe(e => {
        //---Primera opción utilizando un objeto map---
        // this.listRecognitions.push(e);
        // const date = new Date();
        // for (let i = 0; i < this.listRecognitions.length; i++) {
        //   this.moansAndDate.set(this.listRecognitions[i], date);
        // }
        // console.log(this.moansAndDate);

        //---Segunda opción utilizando un array para cada quejidos. Cada array tendrá que añadir una hora nueva cada vez que dicho quejido sea pronunciado. Para ello, habrá que comprobar que la palabra que se detecta sea alguna de las palabras clave y en caso afirmativo hacer un push con la fecha---
        const date = new Date();

        if (e.includes('me') && e.includes('duele')) {
          this.meDuele.push(date);
          console.log('ME DUELE --> detectado');
          console.log(this.meDuele);
        } else {
          console.log('ME DUELE --> NO detectado');
        }

        if (e.includes('ay')) {
          this.ay.push(date);
          console.log('AY --> detectado');
        } else {
          console.log('AY --> NO detectado');
        }

        if (e.includes('para')) {
          this.para.push(date);
          console.log('PARA --> detectado');
        } else {
          console.log('PARA --> NO detectado')
        }

        if (e.includes('no') && e.includes('aguanto')) {
          this.noAguanto.push(date);
          console.log('NO AGUANTO --> detectado');
        } else {
          console.log('NO AGUANTO --> NO detectado')
        }

        if (e.includes('no') && e.includes('puedo')) {
          this.noPuedoMas.push(date);
          console.log('NO PUEDO MAS --> detectado');
        } else {
          console.log('NO PUEDO MAS --> NO detectado')
        }

        if (e.includes('no') && e.includes('puedo') && e.includes('seguir')) {
          this.noPuedoSeguir.push(date);
          console.log('NO PUEDO SEGUIR --> detectado');
        } else {
          console.log('NO PUEDO SEGUIR --> NO detectado')
        }

      })
    this.listEvents = [observer1$, observer2$];
  };
  
  //Detectar pulsaciones
    async conectarPulsera(){ 
      console.log("entro a conectar pulsera");
      let device, server, miband;
      // MiBand = require('miband');
      device = await navigator.bluetooth.requestDevice({
          filters: [
            { services: [ MiBand.advertisementService ] }
          ],
          optionalServices: MiBand.optionalServices
        });
        
      server = await device.gatt.connect();
      console.log('Pulsera conectada');
      
      miband = new MiBand(server);
      await miband.init();
      
      // console.log('Notifications demo...');
      // await miband.showNotification('message');
      miband.on('heart_rate', (rate) => {
        console.log('Heart Rate:', rate)
      })
      await miband.hrmStart();
}

  
  //Método para el envío de las emociones hacia el servidor
  public envioDeEmociones(){
    //Se envía la información de las emociones al servidor cada 5 segundos
    this.intervaloTiempoEmocionesID = setInterval( ()=> {
      fetch("https://webhook.site/be71cef8-6e85-4af4-bbd4-3187d88cf0bf", {
      body: JSON.stringify(this.listExpressions),
      method: "POST"
    })
    }
       , 5000);
  }

  //Método para detener el envío de las emociones
  public pararEnvioDeEmociones() {
    clearInterval(this.intervaloTiempoEmocionesID);
    this.intervaloTiempoEmocionesID = null;
  }

  //Crear método para el envío de los quejidos hacia el servidor
  public async envioDeQuejidos(){
    //Se envía la información de los quejidos al servidor cada 5 segundos
    this.intervaloTiempoQuejidosID =  setInterval( ()=> {
      fetch("https://webhook.site/be71cef8-6e85-4af4-bbd4-3187d88cf0bf", {
        body: JSON.stringify({
            ay: this.ay,
            meDuele: this.meDuele,
            para: this.para,
            noAguanto: this.noAguanto,
            noPuedoMas: this.noPuedoMas,
            noPuedoSeguir: this.noPuedoSeguir
        }),
        method: "POST"
      });  
    }, 5000);
  }

  //Método para detener el envío de los quejidos
  public pararEnvioDeQuejidos() {
    clearInterval(this.intervaloTiempoQuejidosID);
    this.intervaloTiempoQuejidosID = null;
  }

  //Crear método para el envío de las pulsaciones hacia el servidor

}
