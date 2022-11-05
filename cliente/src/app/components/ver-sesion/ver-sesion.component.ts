import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
import * as moment from 'moment';
Chart.register(...registerables);

@Component({
  selector: 'app-ver-sesion',
  templateUrl: './ver-sesion.component.html',
  styleUrls: ['./ver-sesion.component.css']
})
export class VerSesionComponent implements OnInit {

  sesionData: Sesion;
  id: string | null;

  listMoans: any = [];
  listExpressions: any = [];
  listPulsaciones: any = [];
  numMoans;
  listEmotionsPorFecha: any = [];
  editDate: any;

  //Objeto de eventos importantes
  eventos = [{
    nota: "",
    emocion: "",
    quejido: "",
    pulsacion: "",
    fecha: "",
    dolor: ""
  }]

  //Variable para almacenar el nombre de la emoción que tiene mayor valor junto con la fecha
  emocionPorObjeto: any = [];

  constructor(private _sesionService: SesionService, private router: Router, private aRouter: ActivatedRoute) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerDatosSesion();
    setTimeout(() => {          
      this.doughnutEmociones();
      this.stackedBarQuejidos();
      this.linePulsaciones();
      }, 500)
    ;
  }

  obtenerDatosSesion() {
    if(this.id !== null){
      this._sesionService.obtenerSesion(this.id).subscribe(data => {
        //Guardamos en sesionData toda la información de la sesión actual
        console.log(data);
        this.sesionData = data;
        this.listMoans = data.moans;
        this.listExpressions = data.emotions;
        this.listPulsaciones = data.heartbeats;
        this.numMoans = data.moans['ay'].length;
        moment.locale('es');
        this.editDate = moment.utc(data.date).format('LL');

        //Vamos a mapear los datos que nos vienen para obtener un array con la información de los eventos importantes
        data.comments.forEach((comment) => {
          var emocionEvento;
          var quejidoEvento;
          var pulsacionEvento;

            //Recorremos las emociones y nos quedamos con aquella en la que la fecha coincida con la fecha de la nota
            data.emotions.forEach((emotion) => {
              var acum = 0;
              var emo = '';
              // var emotion = data.emotions.find(emo => emo.fecha >= comment.fecha);

              if(emotion.fecha == comment.fecha){
                Object.keys(emotion).forEach((prop) => {
                  //Nos quedamos con la emoción de mayor valor
                  if(emotion[prop] > acum) {
                    acum = emotion[prop];
                    emo = prop; //en emo tenemos la emoción mayor
                  }
                  //Si para esa fecha hay una emoción registrada almacenamos la emoción, si no, almacenamos un mensaje informativo
                  if(emo != null){
                    emocionEvento = emo;
                  }else{
                    emocionEvento = "No hay emoción en ese tiempo";
                  }
                })
              }
            })
              
            //Recorremos el quejido AY
            data.moans['ay'].forEach((moan) => {
              console.log(moan);
              if(moan == comment.fecha){
                quejidoEvento = '¡Ay!';
              }
            })

            //Recorremos el quejido meDuele
            data.moans['meDuele'].forEach((moan) => {
                  if(moan == comment.fecha){
                    quejidoEvento = '¡Me duele!';
                  }
            })

            //Recorremos el quejido para
            data.moans['para'].forEach((moan) => {
              if(moan == comment.fecha){
                quejidoEvento = '¡Para!';
              }
            })

            //Recorremos el quejido noAguanto
            data.moans['noAguanto'].forEach((moan) => {
              if(moan == comment.fecha){
                quejidoEvento = '¡No aguanto!';
              }
            })

            //Recorremos el quejido noPuedoMas
            data.moans['noPuedoMas'].forEach((moan) => {
              if(moan == comment.fecha){
                  quejidoEvento = '¡No puedo más!';
                }
            })

            //Recorremos el quejido noPuedoSeguir
            data.moans['noPuedoSeguir'].forEach((moan) => {
              if(moan == comment.fecha){
                quejidoEvento = '¡No puedo seguir!';
              }
            })

            //Recorremos las pulsaciones 
            data.heartbeats.forEach((puls) => {
              if(puls.fecha == comment.fecha){
                pulsacionEvento = puls.pulsacion;
              }
            })
              // var pulsacion = data.heartbeats.find(pulsacion => pulsacion.fecha = comment.fecha)
              // if(pulsacion){
              //   pulsacionEvento = pulsacion.pulsacion;
              // }

            if(!quejidoEvento){
              quejidoEvento = "No hay quejido para este evento";
            }

            if(!pulsacionEvento){
              pulsacionEvento = 'No hay pulsación para este evento';
            }

            //Evaluación del dolor
            var puntuacionDolor = 0;
            var gradoDolor;
            //Según la emoción que sea sumamos una puntuación u otra:
            if(emocionEvento == 'neutral'){
              puntuacionDolor += 0;
            } else if(emocionEvento == 'happy'){
              puntuacionDolor += 0;
            } else if(emocionEvento == 'surprised'){
              puntuacionDolor += 0;
            } else if(emocionEvento == 'sad'){
              puntuacionDolor += 3;
            } else if(emocionEvento == 'angry'){
              puntuacionDolor += 3;
            } else if(emocionEvento == 'fearful'){
              puntuacionDolor += 3;
            } else if(emocionEvento == 'disgusted'){
              puntuacionDolor += 3;
            } else if(emocionEvento == 'No hay emoción en ese tiempo'){
              puntuacionDolor += 0;
            }

            // Según la emoción que sea sumamos una puntuación u otra:
            if(quejidoEvento == '¡Ay!'){
              puntuacionDolor += 1;
            } else if(quejidoEvento == '¡Me duele!'){
              puntuacionDolor += 1;
            } else if(quejidoEvento == '¡Para!'){
              puntuacionDolor += 1;
            } else if(quejidoEvento == '¡No aguanto!'){
              puntuacionDolor += 2;
            } else if(quejidoEvento == '¡No puedo más!'){
              puntuacionDolor += 2;
            } else if(quejidoEvento == '¡No puedo seguir!'){
              puntuacionDolor += 2;
            } else if(quejidoEvento == 'No hay quejido para este evento'){
              puntuacionDolor += 0;
            }

            // Según la pulsación que sea sumamos una puntuación u otra:
            if(pulsacionEvento >= 80 && pulsacionEvento <= 96){
              puntuacionDolor += 0;
            } else if(pulsacionEvento >= 97 && pulsacionEvento <= 162){
              puntuacionDolor += 2;
            }

            // Determinamos el grado de dolor en función de la puntuación total obtenida
            if(puntuacionDolor == 0){
              gradoDolor = 'NO DOLOR';
            } else if(puntuacionDolor >= 1 && puntuacionDolor <= 3){
              gradoDolor = 'DOLOR LEVE - MODERADO';
            } else if(puntuacionDolor >= 4 && puntuacionDolor <= 6){
              gradoDolor = 'DOLOR MODERADO - GRAVE';
            } else if(puntuacionDolor > 6){
              gradoDolor = 'DOLOR MUY INTENSO';
            }
           
          this.eventos.push({
            nota: comment.nota,
            emocion: emocionEvento,
            quejido: quejidoEvento,
            pulsacion: pulsacionEvento,
            fecha: moment.utc(comment.fecha).format('MMMM Do YYYY, h:mm:ss a'),
            dolor: gradoDolor
          });
        })
        
        console.log(this.eventos);
        
        // const mapaEventos = new Map<string, any>();
        // //Recorremos los comentarios
        // data.comments.forEach((comment) => {
        //   const keyDate = comment.fecha;
        //   mapaEventos.set("fecha", keyDate);
        //   console.log(mapaEventos);
        // })
        
      }, error => {
        console.log(error);
      })
    }
    
  }

  //Número de quejidos en función del ejercicio realizado
  stackedBarQuejidos(){
    var totalPorQuejido = {
      "quejidoAy": this.sesionData.moans['ay'].length,
      "quejidoMeDuele": this.sesionData.moans['meDuele'].length,
      "quejidoPara": this.sesionData.moans['para'].length,
      "quejidoNoPuedoMas": this.sesionData.moans['noAguanto'].length,
      "quejidoNoPuedoSeguir": this.sesionData.moans['noPuedoMas'].length,
      "quejidoNoAguanto": this.sesionData.moans['noPuedoSeguir'].length
    }

    const stackedBarQuejidos = new Chart("stackedBarQuejidos", {
      type: 'bar',
      data: {
        labels: [
          '¡Ay!', '¡Me duele!', '¡Para!', '¡No puedo más!', '¡No puedo seguir!', '¡No aguanto!'
        ],
        datasets: [{
          label: 'Número de quejidos durante la sesión',
          //Sustituir por los valores de la base de datos
          data: [totalPorQuejido.quejidoAy, totalPorQuejido.quejidoMeDuele, totalPorQuejido.quejidoPara, totalPorQuejido.quejidoNoPuedoMas, totalPorQuejido.quejidoNoPuedoSeguir, totalPorQuejido.quejidoNoAguanto],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgb(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
      }
    });
  }

  //Ejemplo pulsaciones durante la sesión, SUSTITUIR POR LOS VALORES DE LA BASE DE DATOS
  linePulsaciones(){
    //El array de las pulsaciones sería así:
      // "heartbeats": [
      //   {
      //     "pulsacion": 68,
      //     "date": "2022-09-27T15:29:32.014Z"
      //   },
      //   {
      //     "pulsacion": 68,
      //     "date": "2022-09-27T15:29:32.014Z"
      //   },
      //   {
      //     "pulsacion": 68,
      //     "date": "2022-09-27T15:29:32.014Z"
      //   },
      // ]
      
    const linePulsaciones = new Chart("linePulsaciones", {
      type: 'line',
      data: {
        labels: ['29/09/2022 17:56:08', '29/09/2022 17:56:13', '29/09/2022 17:56:18', '29/09/2022 17:56:23', '29/09/2022 17:56:28', '29/09/2022 17:56:33', '29/09/2022 17:56:38', '29/09/2022 17:56:43', '29/09/2022 17:56:48', '29/09/2022 17:56:53', '29/09/2022 17:56:58', '29/09/2022 17:57:03', '29/09/2022 17:57:08', '29/09/2022 17:57:13'],
        datasets: [{
          label: 'Pulsaciones durante la sesión (cada 5 segundos)',
          data: [65, 74, 95, 80, 76, 68, 64, 67, 72, 83, 87, 92, 85, 79],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132, 0.2)',
          tension: 0.1,
          fill: false
        }]
      }
    });
  }


  //Emociones durante la sesión
  doughnutEmociones(){
    //Se realiza el tratamiento de los datos de las emociones antes de pintar el gráfico
    //Cada vez que se guarda un objeto de emociones, éste contiene el porcentaje de cada emoción detectada en ese momento. Es por ello por lo que nos quedaremos con
    //la emoción que más valor ha obtenido de cada objeto de emociones y contaremos las veces que cada emoción ha tenido el máximo valor. Se almacenará en el siguiente objeto:
    var totalPorEmocion = {
      "neutral": 0,
      "happy": 0,
      "sad": 0,
      "angry": 0,
      "fearful": 0,
      "disgusted": 0,
      "surprised": 0
    }

    this.sesionData.emotions.forEach((emocion) => {
      var acum = 0;
      var emo = "";
      Object.keys(emocion).forEach((prop) => {
        if(emocion[prop] > acum) {
          acum = emocion[prop];
          emo = prop;
        }
      })
      this.emocionPorObjeto.push({emocion: emo, fecha: emocion.fecha});
      totalPorEmocion[emo]++;
      
      // console.log(emocionPorObjeto);
    })

    var totalPorEmocionPorcentaje = JSON.parse(JSON.stringify(totalPorEmocion));

    Object.keys(totalPorEmocionPorcentaje).forEach((prop) => {
      totalPorEmocionPorcentaje[prop] = (totalPorEmocionPorcentaje[prop] / this.sesionData.emotions.length) * 100;
    })

    console.log(totalPorEmocion);
    console.log(totalPorEmocionPorcentaje);
    console.log(this.emocionPorObjeto);


    const doughnutEmociones = new Chart("doughnutEmociones", {
      type: 'doughnut',
      data: {
        labels: [
          'Neutral',
          'Feliz',
          'Triste',
          'Enfadado',
          'Asqueado',
          'Disgustado',
          'Sorprendido'
        ],
        datasets: [{
          label: 'Emociones durante la sesión',
          data: [totalPorEmocionPorcentaje['neutral'], totalPorEmocionPorcentaje['happy'], totalPorEmocionPorcentaje['sad'], totalPorEmocionPorcentaje['angry'], totalPorEmocionPorcentaje['fearful'], totalPorEmocionPorcentaje['disgusted'], totalPorEmocionPorcentaje['surprised']],
          backgroundColor: [
            'rgb(214, 214, 214)',
            'rgb(254, 255, 179)',
            'rgb(179, 187, 255)',
            'rgb(255, 179, 179)',
            'rgb(255, 223, 179)',
            'rgba(231, 179, 255)',
            'rgba(182, 255, 154)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }


}
