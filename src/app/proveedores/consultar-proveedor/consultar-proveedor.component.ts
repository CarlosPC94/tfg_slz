import { Router } from '@angular/router';
import { Proveedores } from './../../models/proveedores';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-proveedor',
  templateUrl: './consultar-proveedor.component.html',
  styleUrls: ['./consultar-proveedor.component.scss'],
})
export class ConsultarProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor: Proveedores;

  constructor(private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Consultar Proveedor";
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
  }

  pedido(){
    this.router.navigateByUrl("/realizarPedidoProveedor")
  }

}
