import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-ver-sesion',
  templateUrl: './ver-sesion.component.html',
  styleUrls: ['./ver-sesion.component.css']
})
export class VerSesionComponent implements OnInit {

  sesionData: Sesion;
  id: string | null;

  constructor(private _sesionService: SesionService, private router: Router, private aRouter: ActivatedRoute) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerDatosSesion();
    setTimeout(() => {          
      this.doughnutEmociones();
      this.stackedBarQuejidos();
      this.linePulsaciones();
      }, 3000)
    ;
  }

  obtenerDatosSesion() {
    if(this.id !== null){
      this._sesionService.obtenerSesion(this.id).subscribe(data => {
        //Guardamos en sesionData toda la información de la sesión actual
        this.sesionData = data;
        console.log(this.sesionData);
        console.log(this.sesionData.emotions.length);
        console.log(this.sesionData.moans['ay'].length);
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
      totalPorEmocion[emo]++;
    })

    var totalPorEmocionPorcentaje = JSON.parse(JSON.stringify(totalPorEmocion));

    Object.keys(totalPorEmocionPorcentaje).forEach((prop) => {
      totalPorEmocionPorcentaje[prop] = (totalPorEmocionPorcentaje[prop] / this.sesionData.emotions.length) * 100;
    })

    console.log("Total de emociones:" + totalPorEmocion);
    console.log("Porcentajes emociones:" + totalPorEmocionPorcentaje);


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
