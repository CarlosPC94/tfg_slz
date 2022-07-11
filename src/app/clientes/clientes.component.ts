import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  nombrePag: string;

  constructor(private db:FirestoreService) { }

  ngOnInit() {
    this.nombrePag = "Clientes"
    this.db.getCollection<Clientes>("Users").subscribe(res => {
      this.clientes = res;
      console.log(this.clientes);
    })

    }
}
