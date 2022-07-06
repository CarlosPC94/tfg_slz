import { FirestoreService } from 'src/app/services/firestore.service';
import { CartProducts } from './../../models/cartProducts';
import { Pedidos } from './../../models/pedidos';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.scss'],
})
export class ConsultarPedidoComponent implements OnInit {

  nombrePag: string;
  pedido: Pedidos;
  idPedido: string;
  productosPedido: CartProducts[] = [];

  constructor(private db: FirestoreService) { }

  async ngOnInit() {
    this.nombrePag = "Pedido"
    this.idPedido = localStorage.getItem("pedidoId");
    this.pedido = JSON.parse(localStorage.getItem("pedido"));
    await this.db.getCollection<CartProducts>("Pedidos/"+ this.idPedido + "/Productos").subscribe((res) => {
      console.log(res)
      this.productosPedido = res;
    })
    
  }

}
