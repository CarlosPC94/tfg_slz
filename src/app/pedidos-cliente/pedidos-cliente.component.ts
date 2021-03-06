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
      res.sort((a,b) => {
        if (a.fecha > b.fecha)
          return -1;
        if ( a.fecha < b.fecha)
          return 1
        return 0;
      })
      this.pedidos = res;
    })
    await this.db.getIds("Pedidos", this.ids)
  }

  consultarPedido(pedido: Pedidos){
    localStorage.setItem("pedido-cliente", JSON.stringify(pedido));
    this.router.navigateByUrl("/consultarPedidoCliente")
  }

  marcarEntregado(pedido: Pedidos){
    this.db.entregarPedido("PedidosCliente", pedido.id);
  }

}
