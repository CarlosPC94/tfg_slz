import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalController } from '@ionic/angular';
import { CartService } from './../../services/cart.service';
import { CartProducts } from './../../models/cartProducts';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: CartProducts[] = [];

  constructor(private cartService: CartService, private modalController: ModalController, private db: FirestoreService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(product) {
    this.cart = this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cart = this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cart = this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.Precio * j.Cantidad, 0);
  }
 
  close() {
    this.modalController.dismiss();
  }
  
  async checkout(){
    let id = await this.db.createId();
    let proveedor = JSON.parse(localStorage.getItem("proveedor"));
    var date = new Date();
    let data = {
      Nombre: proveedor.Nombre,
      Entregado: false,
      fecha: this.datePipe.transform(date, 'dd-MM-yyyy'),
      Total: this.getTotal()
    }
    this.db.createDoc(data, "Pedidos", id).then(() => {
      for(var i = 0; i < this.cart.length; i++){
        this.db.createDoc(this.cart[i], "Pedidos/"+ id + "/Productos", this.db.createId())
      }
      this.cart = []
    })
  }

}
