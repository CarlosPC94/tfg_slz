import { element } from 'protractor';
import { ConsultarClienteComponent } from './consultar-cliente/consultar-cliente.component';
import { Router } from '@angular/router';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from '../models/clientes';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  clientes: Clientes[] = [];
  nombrePag: string;

  constructor(private db:FirestoreService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.nombrePag = "Clientes"
    this.db.getCollection<Clientes>("Users").subscribe(res => {
      res.forEach(element => {
        if (element.Tipo == "Cliente")  
          this.clientes.push(element);
      })
    })
    }

  realizarPedido(cliente: Clientes){
    localStorage.setItem("cliente",JSON.stringify(cliente));
    this.router.navigateByUrl("/pedidoCliente")
  }

  async consultarCliente(cliente: Clientes){
    localStorage.setItem("cliente", JSON.stringify(cliente));
    let modal = await this.modalController.create({
      component: ConsultarClienteComponent,
      cssClass: 'consultar-cliente'
    })
    modal.present();
  }
}
