import { ConsultarProveedorComponent } from './consultar-proveedor/consultar-proveedor.component';
import { element } from 'protractor';
import { Proveedores } from './../models/proveedores';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Temas } from '../models/temas';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {

  constructor(private firestore: FirestoreService, private router: Router, private auth: AuthService, private modalController: ModalController) {
    if (this.auth.getUserLogged() == null)
      this.router.navigateByUrl("/login")
   }

  coche: String;
  proveedores: Proveedores[] = [];
  user: any;
  nombrePag: string;
  aux: Proveedores[] = [];

  ngOnInit() {
    console.log(this.auth.getUserLogged());
    this.nombrePag = "Proveedores"
    this.auth.comprobarPermisos();
    this.user = JSON.parse(localStorage.getItem("User"));
    console.log(this.user)
    this.firestore.getCollection<Proveedores>("Proveedores").subscribe(res => {
      this.proveedores = res;
      localStorage.setItem("proveedores", JSON.stringify(res.sort((a,b) => {
        if (a.Nombre > b.Nombre)
          return 1
        if (a.Nombre < b.Nombre)
          return -1
        return 0;
      } )));
      this.aux = res;
      console.log(res)
    })
  }

  async verProveedores(proveedores: Proveedores){

    var aux = {
      Nombre : proveedores.Nombre,
      Categoria : proveedores.Categoria,
      Movil : proveedores.Movil,
      Email: proveedores.Email,
      Ciudad: proveedores.Ciudad,
      Direccion: proveedores.Direccion,
      Web: proveedores.Web
    }
    localStorage.setItem("proveedor", JSON.stringify(aux));
    let modal = await this.modalController.create({
      component: ConsultarProveedorComponent,
      cssClass: 'consultar-proveedor'
    })
    modal.present();
  }

  pedidoProveedor(proveedor: Proveedores){
    localStorage.setItem("proveedor", JSON.stringify(proveedor));
    this.router.navigateByUrl("/realizarPedidoProveedor");
  }

  buscarProveedor(event: any){
    this.proveedores = [];
    this.aux.forEach( element => {
      if(element.Nombre.includes(event.target.value))
        this.proveedores.push(element)
      }  
    )
    if (event.target.value == ""){
      this.proveedores = this.aux;
    }    
  }

  categoriaProveedor(event){
    this.proveedores = [];
    if(event.target.value == "Todo")
      this.proveedores = this.aux;
    else{
      this.aux.forEach( element => {
      if(element.Categoria == event.target.value)
        this.proveedores.push(element);
    })
    } 
  }
}
