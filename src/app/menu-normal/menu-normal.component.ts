import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-normal',
  templateUrl: './menu-normal.component.html',
  styleUrls: ['./menu-normal.component.scss'],
})
export class MenuNormalComponent implements OnInit {

  user:any;

  constructor(private menu: MenuController, private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("User"));
    console.log("HOLAAAAAAAA")
    console.log(this.user)
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    this.user = JSON.parse(localStorage.getItem("User"));
  }

  openEnd() {
    this.menu.open('end');
    this.user = JSON.parse(localStorage.getItem("User"));
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    this.user = JSON.parse(localStorage.getItem("User"));
  }

  cerrarSesion(){
    this.auth.logOut();
    this.route.navigateByUrl("");
  }

}
