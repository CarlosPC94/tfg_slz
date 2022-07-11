import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from './../../services/firestore.service';
import { Router } from '@angular/router';
import { Proveedores } from './../../models/proveedores';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-proveedor',
  templateUrl: './consultar-proveedor.component.html',
  styleUrls: ['./consultar-proveedor.component.scss'],
})
export class ConsultarProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor: Proveedores;

  constructor(private router: Router, private db: FirestoreService, private toast: InteractionService) { }

  ngOnInit() {
    this.nombrePag = "Consultar Proveedor";
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
  }

  pedido(){
    this.router.navigateByUrl("/realizarPedidoProveedor")
  }

  async borrarProveedor(){
    await this.db.deleteDoc("Proveedores", this.proveedor.Email);
    this.toast.presentToast("El proveedor ha sido eliminado correctamente");
    this.router.navigateByUrl("/proveedores");
  }
}
