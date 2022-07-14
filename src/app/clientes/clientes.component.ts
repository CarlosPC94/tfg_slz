import { Router } from '@angular/router';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  clientes: Clientes[] = [];
  nombrePag: string;

  constructor(private db:FirestoreService, private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Clientes"
    this.db.getCollection<Clientes>("Users").subscribe(res => {
      this.clientes = res;
      console.log(this.clientes);
    })
    }

  realizarPedido(cliente: Clientes){
    localStorage.setItem("cliente",JSON.stringify(cliente));
    this.router.navigateByUrl("/pedidoCliente")
  }
}
