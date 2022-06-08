import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { CrearSesionComponent } from './components/crear-sesion/crear-sesion.component';
import { VerPacienteComponent } from './components/ver-paciente/ver-paciente.component';

const routes: Routes = [
  {path: '', component: ListarPacientesComponent},
  {path: 'ver-paciente', component: VerPacienteComponent},
  {path: 'crear-sesion', component: CrearSesionComponent},
  //{path: 'editar-sesion', component: CrearSesionComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
