import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/pedidos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  pedidos: Pedidos[] = [];
  nombrePag: string;
  ids: string[] = []

  constructor(private db: FirestoreService, private route: Router) { }

  async ngOnInit() {
    this.nombrePag = "Pedidos Proveedores"
    this.db.getCollection<Pedidos>("Pedidos").subscribe((res) => {
      this.pedidos = res;
    })
    await this.db.getIds("Pedidos", this.ids)
  }

  consultarPedido(pedido: Pedidos, index: number){
    localStorage.setItem("pedido", JSON.stringify(pedido));
    console.log(this.ids[index])
    localStorage.setItem("pedidoId", this.ids[index]);
    this.route.navigateByUrl("/consultarPedido")
  
  }

}
