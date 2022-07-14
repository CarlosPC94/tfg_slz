import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from './../../services/firestore.service';
import { Router } from '@angular/router';
import { Proveedores } from './../../models/proveedores';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/models/pedidos';

@Component({
  selector: 'app-consultar-proveedor',
  templateUrl: './consultar-proveedor.component.html',
  styleUrls: ['./consultar-proveedor.component.scss'],
})
export class ConsultarProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor: Proveedores;
  pedidos: Pedidos[] = [];

  constructor(private router: Router, private db: FirestoreService, private toast: InteractionService) { }

  async ngOnInit() {
    this.nombrePag = "Consultar Proveedor";
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
/*     await this.db.getCollection<Pedidos>("Pedidos").subscribe(res => {
      res.forEach(element => {
        if (element.Nombre == this.proveedor.Nombre)
          this.pedidos.push(element);
      })
      this.pedidos.sort((a,b) => {
        if(a.fecha < b.fecha)
          return 1
        if(a.fecha > b.fecha)
          return -1
        return 0
      })
    }) */
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
