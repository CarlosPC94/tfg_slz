import { CartProducts } from './../../models/cartProducts';
import { CartModalPage } from './../../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Primas } from './../../models/primas';
import { FirestoreService } from './../../services/firestore.service';
import { Proveedores } from './../../models/proveedores';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MateriaModalComponent } from './materia-modal/materia-modal.component';

@Component({
  selector: 'app-realizar-pedido-proveedor',
  templateUrl: './realizar-pedido-proveedor.component.html',
  styleUrls: ['./realizar-pedido-proveedor.component.scss'],
})
export class RealizarPedidoProveedorComponent implements OnInit {

  nombrePag: string;
  proveedor: Proveedores;
  productos: Primas[] = [];
  aux: Primas[] = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private db: FirestoreService, private cartService: CartService, private modalController: ModalController) {
    
   }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
    this.nombrePag = "Realizar Pedido Proveedor";
    console.log(this.proveedor.Email)
    this.db.getCollection<Primas>("Proveedores/"+this.proveedor.Email+"/Productos").subscribe(res => {
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

  async abrirProducto(producto: Primas){
    localStorage.setItem("producto", JSON.stringify(producto));
    let modal = await this.modalController.create({
      component: MateriaModalComponent,
      cssClass: 'materia-modal'
    })
    modal.present();
  }

  addToCart(product){
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
