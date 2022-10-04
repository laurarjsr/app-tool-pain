import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { CrearSesionComponent } from './components/crear-sesion/crear-sesion.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EmotionsPlayerComponent } from './emotions-player/emotions-player.component';
import { EmocionesPipe } from './pipes/emociones.pipe';
import { VerSesionComponent } from './components/ver-sesion/ver-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarPacientesComponent,
    CrearSesionComponent,
    VerPacienteComponent,
    EmotionsPlayerComponent,
    EmocionesPipe,
    VerSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
