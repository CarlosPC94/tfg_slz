import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Primas } from 'src/app/models/primas';
import { CartService } from 'src/app/services/cart.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-materia-modal',
  templateUrl: './materia-modal.component.html',
  styleUrls: ['./materia-modal.component.scss'],
})
export class MateriaModalComponent implements OnInit {

  producto: Primas;

  constructor(private modalController: ModalController, private db: FirestoreService, private cartService: CartService) { }

  ngOnInit() {
    this.producto = JSON.parse(localStorage.getItem("producto"));
  }

}
