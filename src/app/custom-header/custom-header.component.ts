import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { RegistrarClienteComponent } from '../clientes/registrar-cliente/registrar-cliente.component';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {

  @Input() public varName: string;

  constructor(private menu: MenuController, private modalController: ModalController) { }

  ngOnInit() {
  }

  abrirMenu(){
    this.menu.open()
  }

  async registrarCliente(){
    let modal = await this.modalController.create({
      component: RegistrarClienteComponent,
      cssClass: 'registrar-cliente'
    })
    modal.present();
  }

}
