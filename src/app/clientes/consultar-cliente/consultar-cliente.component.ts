import { Clientes } from './../../models/clientes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.scss'],
})
export class ConsultarClienteComponent implements OnInit {

  cliente: Clientes;

  constructor() { }

  ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
  }

}
