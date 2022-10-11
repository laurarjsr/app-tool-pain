import { Component, OnInit } from '@angular/core';
// import TabulatorTable from 'tabulator-tables';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   var tableData = [
  //     {name: "Juan", apellidoPrimero: "Sánchez", apellidoSegundo: "López", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Marta", apellidoPrimero: "García", apellidoSegundo: "Fernández", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Nazaret ", apellidoPrimero: "Caro", apellidoSegundo: "Palacios", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Leocadio", apellidoPrimero: "Ureña", apellidoSegundo: "Suárez", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Zaira", apellidoPrimero: "Zabala", apellidoSegundo: "Perelló", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Albert", apellidoPrimero: "Vendrell", apellidoSegundo: "Plana", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Lupita", apellidoPrimero: "Cabo", apellidoSegundo: "Meléndez", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Miriam", apellidoPrimero: "Gallart", apellidoSegundo: "Salmerón", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Nando", apellidoPrimero: "Macias", apellidoSegundo: "Sotelo", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Ignacia", apellidoPrimero: "Menendez", apellidoSegundo: "Pavón", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Rocío", apellidoPrimero: "Rosselló", apellidoSegundo: "Romero", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Aureliano", apellidoPrimero: "Albero", apellidoSegundo: "Jover", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Amelia", apellidoPrimero: "Saura", apellidoSegundo: "Cabello", fechaInicioRehabilitacion: "13/01/2022"},
  //     {name: "Isidro", apellidoPrimero: "Juliá", apellidoSegundo: "Paz", fechaInicioRehabilitacion: "13/01/2022"},
  //   ];

  //   var table = new TabulatorTable("#pacientes", {
  //     data: tableData, 
  //     layout:"fitColumns", 
  //     columns:[
  //       {title:"Nombre", field:"name", width:150},
  //       {title:"Primer apellido", field:"apellidoPrimero", hozAlign:"center"},
  //       {title:"Segundo apellido", field:"apellidoSegundo"},
  //       {title:"Fecha de inicio de rehabilitación", field:"fechaInicioRehabilitacion", sorter:"date", hozAlign:"center"},
  //      {title: "Acceder expediente", formatter:() => {return "<button> Ver </button>"}}
  //     ],
  //  });

  //   var buscador = document.getElementById('buscador');

  //   // buscador.addEventListener('input',(e) => {
  //   //   var textoIntroducido = e.target.value;
  //   //   table.setFilter([{field: "name", type:"like", value: textoIntroducido}])
  //   // })

  //   table.on("rowClick", function(e, row){
  //     window.location.replace('http://localhost:4200/ver-paciente');
  //   })

  }

}
