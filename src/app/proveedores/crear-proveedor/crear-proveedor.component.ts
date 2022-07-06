import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss'],
})
export class CrearProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor = {
    Nombre: "",
    Email: "",
    Movil: "",
    Categoria: "",
    Ciudad: "",
    Direccion: ""
  }

  constructor(private router: Router, private db: FirestoreService, private toast: InteractionService) { }

  ngOnInit() {
    this.nombrePag = "Crear Proveedor";
  }

  crearProveedor(){
    this.db.createDoc(this.proveedor, "Proveedores", this.proveedor.Email).then(() => {
      this.toast.presentToast("Proveedor Registrado Satisfactoriamente");
      this.router.navigateByUrl("/proveedores");
    })
  }

}
