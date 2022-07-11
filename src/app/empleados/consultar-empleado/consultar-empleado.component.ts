import { element } from 'protractor';
import { Dias } from 'src/app/models/dias';
import { FirestoreService } from './../../services/firestore.service';
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
  dias: Dias[] = [];
  lunes: Dias;
  martes: Dias;
  miercoles: Dias;
  jueves: Dias;
  viernes: Dias;
  sabado: Dias;
  
  constructor(private db: FirestoreService) { }

  async ngOnInit() {
    this.empleado = JSON.parse(localStorage.getItem("empleado"));
    this.dias = JSON.parse(localStorage.getItem("Horario"));
    console.log(this.dias)
    this.dias.sort(function(a,b) {
      return a.Numero - b.Numero
    })
    this.nombrePag = "Perfil Empleado"; 
  }

  modificarEntrada(event: any, dia: Dias){
    this.db.updateDayStart("Empleados/"+ this.empleado.DNI +"/Horario", dia.Nombre, event.target.value);
  }

  modificarSalida(event: any, dia: Dias){
    this.db.updateDayEnd("Empleados/"+ this.empleado.DNI +"/Horario", dia.Nombre, event.target.value);
  }
}
