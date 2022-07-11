import { Dias } from 'src/app/models/dias';
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
  horario: Dias[] = [];

  constructor(private db: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Empleados";
    this.db.getCollection<Empleados>("Empleados").subscribe( res => {
      this.empleados = res;
    })
    
  }

  async consultarEmpleado(empleado: Empleados){
    localStorage.setItem("empleado", JSON.stringify(empleado));
    await this.db.getCollection<Dias>("Empleados/"+empleado.DNI+"/Horario/").subscribe(res => {
      this.horario = res;
      localStorage.setItem("Horario", JSON.stringify(this.horario))
    })
    
    this.router.navigateByUrl("/consultarEmpleado");
  }

}
