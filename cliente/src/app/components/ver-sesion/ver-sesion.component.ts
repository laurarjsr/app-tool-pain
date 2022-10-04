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
    this.stackedBarQuejidos();
    this.linePulsaciones();
    this.pieEmociones();
    this.lineQuejidos();
  }

  obtenerDatosSesion() {
    if(this.id !== null){
      this._sesionService.obtenerSesion(this.id).subscribe(data => {
        this.sesionData = data;
        console.log(this.sesionData);
      }, error => {
        console.log(error);
      })
    }
    
  }

  //Número de quejidos en función del ejercicio realizado
  stackedBarQuejidos(){
    const stackedBarQuejidos = new Chart("stackedBarQuejidos", {
      type: 'bar',
      data: {
        labels: [
          'Enrrollar una toalla',
          'Hacer la letra O',
          'Hacer puño'
        ],
        datasets: [{
          label: 'Número de quejidos en función del ejercicio realizado',
          data: [2, 1, 4],
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

  //Ejemplo pulsaciones durante la sesión
  linePulsaciones(){
    const linePulsaciones = new Chart("linePulsaciones", {
      type: 'line',
      data: {
        labels: ['29/09/2022 17:56:08', '29/09/2022 17:56:13', '29/09/2022 17:56:18', '29/09/2022 17:56:23', '29/09/2022 17:56:28', '29/09/2022 17:56:33', '29/09/2022 17:56:38', '29/09/2022 17:56:43', '29/09/2022 17:56:48', '29/09/2022 17:56:53', '29/09/2022 17:56:58', '29/09/2022 17:57:03', '29/09/2022 17:57:08', '29/09/2022 17:56:13'],
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
  pieEmociones(){
    const pieEmociones = new Chart("pieEmociones", {
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
          data: [5, 1, 1, 3, 1, 1, 1],
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
      },
    });
  }

  //Número de cada quejido durante la sesion
  lineQuejidos(){
    const lineQuejidos = new Chart("lineQuejidos", {
      type: 'line',
      data: {
        labels: ['¡Ay!', '¡Me duele!', '¡Para!', '¡No puedo más!', '¡No puedo seguir!', '¡No aguanto!'],
        datasets: [{
          label: 'Número de quejidos durante la sesión',
          data: [3,2,0,1,0,1],
          borderColor: 'rgb(179, 187, 255)',
          backgroundColor: 'rgb(179, 187, 255, 0.2)',
          tension: 0.1,
          fill: false
        }]
      },
    })
  }


}
