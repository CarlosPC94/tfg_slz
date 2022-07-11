import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user: any;
  nombrePag: string;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("User"));
    this.nombrePag = "Perfil";
    this.db.getDocById("Users", this.user.email).subscribe(res => {
      this.user = res;
      console.log(this.user)
    })
  }

}
