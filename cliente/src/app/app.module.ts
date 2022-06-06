import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { CrearSesionComponent } from './components/crear-sesion/crear-sesion.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarPacientesComponent,
    CrearSesionComponent,
    VerPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
