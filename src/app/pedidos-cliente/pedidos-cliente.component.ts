import { Router } from '@angular/router';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/pedidos';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.scss'],
})
export class PedidosClienteComponent implements OnInit {

  pedidos: Pedidos[] = [];
  nombrePag: string;
  ids: string[] = []
  
  constructor(private db: FirestoreService, private router: Router) { }

  async ngOnInit() {
    this.nombrePag = "Pedidos Clientes"
    this.db.getCollection<Pedidos>("PedidosCliente").subscribe((res) => {
      this.pedidos = res;
    })
    await this.db.getIds("Pedidos", this.ids)
  }

  consultarPedido(pedido: Pedidos){
    localStorage.setItem("pedido-cliente", JSON.stringify(pedido));
    this.router.navigateByUrl("/consultarPedidoCliente")
  }

}
