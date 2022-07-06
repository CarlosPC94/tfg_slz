import { Router } from '@angular/router';
import { Empleados } from './../models/empleados';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {

  nombrePag: string;
  empleados: Empleados[] = [];

  constructor(private db: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Empleados";
    this.db.getCollection<Empleados>("Empleados").subscribe( res => {
      this.empleados = res;
      console.log(this.empleados)
    })
    
  }

  consultarEmpleado(empleado: Empleados){
    localStorage.setItem("empleado", JSON.stringify(empleado));
    this.router.navigateByUrl("/consultarEmpleado");
  }

}
