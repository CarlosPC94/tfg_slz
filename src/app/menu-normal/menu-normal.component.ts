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

  constructor(private menu: MenuController, private auth: AuthService, private route: Router) { }

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  cerrarSesion(){
    this.auth.logOut();
    this.route.navigateByUrl("");
  }

}
