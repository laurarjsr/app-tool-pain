import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent implements OnInit {
  listSesiones: Sesion[] = [];

  constructor(private _sesionService: SesionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerSesiones();
  }

  obtenerSesiones() {
    this._sesionService.getSesiones().subscribe(data => {
      console.log(data);
      this.listSesiones = data;
      console.log(this.listSesiones.length);
    }, error => {
    console.log(error);
  })
  }

  eliminarSesion(id: any){
    this._sesionService.eliminarSesion(id).subscribe(data => {
      this.toastr.error('La sesión fue eliminada con éxito','Sesión Eliminada');
      this.obtenerSesiones();
    }, error => {
      console.log(error);
    })
  }

}
