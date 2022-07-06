import { Empleados } from './../../models/empleados';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-empleado',
  templateUrl: './consultar-empleado.component.html',
  styleUrls: ['./consultar-empleado.component.scss'],
})
export class ConsultarEmpleadoComponent implements OnInit {

  nombrePag: string;
  empleado: Empleados;
  
  constructor() { }

  ngOnInit() {
    this.nombrePag = "Perfil Empleado";
    this.empleado = JSON.parse(localStorage.getItem("empleado"));
    console.log(this.empleado)
  }

}
