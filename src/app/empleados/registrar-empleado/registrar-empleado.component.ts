import { InteractionService } from './../../services/interaction.service';
import { Router } from '@angular/router';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss'],
})
export class RegistrarEmpleadoComponent implements OnInit {

  nombrePag: string;
  image: any;
  previsualizacion: string;
  empleado = {
    Nombre: "",
    Apellidos: "",
    Foto: "",
    DNI: "",
    Email: "",
    Password: "",
    Ciudad: "",
    Direccion: "",
    Movil: ""
  }

  constructor(private db: FirestoreService, private router: Router, private toast: InteractionService) { 
    
  }

  ngOnInit() {
    this.nombrePag = "Registrar Empleado";
  }

  capturarImagen(event: any){
    this.image = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.image[0]);
    reader.onloadend = () => {
      this.image = reader.result;
      this.empleado.Foto = this.image;
      this.previsualizacion = this.empleado.Foto;
    }
  }

  crearEmpleado(){
    this.db.createDocWithImage(this.empleado, "Empleados", this.empleado.DNI).then(() => {
      this.toast.presentToast("Empleado Registrado Satisfactoriamente");
      this.router.navigateByUrl("/empleados")
    })
  }

}
