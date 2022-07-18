import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Primas } from '../models/primas';

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
      this.productos = res;
    })
  }

}
