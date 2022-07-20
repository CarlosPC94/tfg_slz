import { element } from 'protractor';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Primas } from '../models/primas';
import { iif } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {


  nombrePag: string;
  productos: Primas[] = [];

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.nombrePag = "Stock";
    this.db.getCollection<Primas>("Productos").subscribe( res => {
      res.sort((a,b) => {
        if(a.Restante < b.Restante)
          return -1;
        if (a.Restante > b.Restante)
          return 1;
        return 0;
      })
      this.productos = res;
    })
  }

  aumentarCantidad(producto: Primas){
    this.db.aumentarCantidadProducto(producto.id, producto.Restante + 1);
  }

  bajarCantidad(producto: Primas){
    this.db.aumentarCantidadProducto(producto.id, producto.Restante - 1);
  }

  modificarCantidad(event: any, producto: Primas){
    this.db.aumentarCantidadProducto(producto.id, event.target.value);
  }

}
