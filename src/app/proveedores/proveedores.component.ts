import { Proveedores } from './../models/proveedores';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Temas } from '../models/temas';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {

  constructor(private firestore: FirestoreService, private router: Router, private auth: AuthService) {
    if (this.auth.getUserLogged() == null)
      this.router.navigateByUrl("/login")
   }

  coche: String;
  proveedores: Proveedores[] = [];
  user: any;
  nombrePag: string;

  ngOnInit() {
    this.nombrePag = "Proveedores"
    this.auth.comprobarPermisos();
    this.user = JSON.parse(localStorage.getItem("User"));
    console.log(this.user)
    this.firestore.getCollection<Proveedores>("Proveedores").subscribe(res => {
      this.proveedores = res;
      console.log(res)
    })
  }

  verProveedores(proveedores: Proveedores){

    var aux = {
      Nombre : proveedores.Nombre,
      Categoria : proveedores.Categoria,
      Movil : proveedores.Movil,
      Email: proveedores.Email,
      Ciudad: proveedores.Ciudad,
      Direccion: proveedores.Direccion
    }
    localStorage.setItem("proveedor", JSON.stringify(aux));
    this.router.navigateByUrl("/consultarProveedor")
  }

  pedidoProveedor(proveedor: Proveedores){
    localStorage.setItem("proveedor", JSON.stringify(proveedor));
    this.router.navigateByUrl("/realizarPedidoProveedor");
  }

}
