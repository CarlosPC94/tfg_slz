import { element } from 'protractor';
import { Proveedores } from './../models/proveedores';
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
  proveedores: Proveedores[] = [];
  aux: Pedidos[] = [];
  constructor(private db: FirestoreService, private route: Router) { }

  async ngOnInit() {
    this.nombrePag = "Pedidos Proveedores";
    this.proveedores = JSON.parse(localStorage.getItem("proveedores"));
    this.db.getCollection<Pedidos>("Pedidos").subscribe((res) => {
      this.pedidos = res;
      this.aux = res;
    })
  }

  consultarPedido(pedido: Pedidos, index: number){
    localStorage.setItem("pedido", JSON.stringify(pedido));
    this.route.navigateByUrl("/consultarPedido") 
  }

  pedidosPorEntregar(){
    this.pedidos = [];
    this.aux.forEach(element => {
      if(element.Entregado == false)
        this.pedidos.push(element);
    })
  }

  pedidosEntregados(){
    this.pedidos = [];
    this.aux.forEach(element => {
      if(element.Entregado == true)
        this.pedidos.push(element);
    })
  }

  todos(){
    this.pedidos = this.aux;
  }

  categoria(event: any){
    this.pedidos = [];
    if (event.target.value == 'Todos')
      this.pedidos = this.aux;
    else {
      this.aux.forEach(element => {
      if (element.Nombre == event.target.value)
        this.pedidos.push(element);
    })
    }    
  }

  marcarEntregado(pedido: Pedidos){
    this.db.entregarPedido("Pedidos", pedido.id);
  }

}
