import { FirestoreService } from './../../services/firestore.service';
import { Primas } from './../../models/primas';
import { Clientes } from './../../models/clientes';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';

@Component({
  selector: 'app-realizar-pedido-cliente',
  templateUrl: './realizar-pedido-cliente.component.html',
  styleUrls: ['./realizar-pedido-cliente.component.scss'],
})
export class RealizarPedidoClienteComponent implements OnInit {


  cliente: Clientes;
  nombrePag: string;
  productos: Primas[] = [];
  aux: Primas[] = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private db: FirestoreService, private cartService: CartService, private modalController: ModalController) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
    this.nombrePag = "Pedido Cliente";
    await this.db.getCollection<Primas>("Productos").subscribe(res => {
      this.productos = res;
      this.aux = res;
    })
  }

  async openCart(){
    let modal = await this.modalController.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    })
    modal.present();  
  }

  addToCart(product){
    console.log(product)
    this.cartService.addProduct(product);
  }

  buscar(event: any){
    if(event.target.value == ''){
      this.productos = this.aux;
    } else {
      this.productos = [];
      this.aux.forEach(element => {
        if (element.Nombre.includes(event.target.value)){
          this.productos.push(element);
        }
      })
    }
  }

  categoria(event: any){
    if(event.target.value == 'Todo'){
      this.productos = this.aux;
    } else {
      this.productos = [];
      this.aux.forEach(element => {
        if (element.Categoria == event.target.value){
          this.productos.push(element);
        }
      })
    }
  }

}
