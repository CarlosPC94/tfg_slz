import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {

  @Input() public varName: string;

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  abrirMenu(){
    this.menu.open()
  }

}
