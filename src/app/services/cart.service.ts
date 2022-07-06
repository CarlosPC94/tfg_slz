import { CartProducts } from './../models/cartProducts';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product){
    let added = false;
    for (let p of this.cart) {
      if (p.Nombre == product.Nombre) {
        p.Cantidad += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product)
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    return this.cart;
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.Nombre === product.Nombre) {
        p.Cantidad -= 1;
        if (p.Cantidad == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
    return this.cart;
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.Nombre === product.Nombre) {
        this.cartItemCount.next(this.cartItemCount.value - p.Cantidad);
        this.cart.splice(index, 1);
      }
    }
    return this.cart;
  }
}
