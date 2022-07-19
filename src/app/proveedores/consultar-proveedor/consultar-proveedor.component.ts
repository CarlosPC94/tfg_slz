import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from './../../services/firestore.service';
import { Router } from '@angular/router';
import { Proveedores } from './../../models/proveedores';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/models/pedidos';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-consultar-proveedor',
  templateUrl: './consultar-proveedor.component.html',
  styleUrls: ['./consultar-proveedor.component.scss'],
})
export class ConsultarProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor: Proveedores;
  pedidos: Pedidos[] = [];

  constructor(private router: Router, private db: FirestoreService, private toast: InteractionService, private modalController: ModalController) { }

  async ngOnInit() {
    this.nombrePag = "Consultar Proveedor";
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
  }

  pedido(){
    this.router.navigateByUrl("/realizarPedidoProveedor");
    this.modalController.dismiss();
  }

  async borrarProveedor(){
    await this.db.deleteDoc("Proveedores", this.proveedor.Email);
    this.toast.presentToast("El proveedor ha sido eliminado correctamente");
    this.router.navigateByUrl("/proveedores");
  }
}
