import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user: any;
  nombrePag: string;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("User"));
    console.log(this.user)
    this.nombrePag = "Perfil"
  }

}
