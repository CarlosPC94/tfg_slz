import { Router } from '@angular/router';
import { InteractionService } from './../../services/interaction.service';
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
  fecha: string;

  constructor(private cartService: CartService, private modalController: ModalController, private db: FirestoreService,
     private datePipe: DatePipe, private toast: InteractionService, private router: Router) { }

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
    if(document.location.href.includes("pedidoCliente") == true){
      let cliente = JSON.parse(localStorage.getItem("cliente"));
      var date = new Date();
      let data = {
        Nombre: cliente.Nombre,
        Entregado: false,
        fecha: this.datePipe.transform(date, 'dd-MM-yyyy'),
        Total: this.getTotal(),
        id: id,
        Recogida: this.fecha
      }
      this.db.createDoc(data, "PedidosCliente", id).then(() => {
        for(var i = 0; i < this.cart.length; i++){
          this.db.createDoc(this.cart[i], "PedidosCliente/"+ id + "/Productos", this.db.createId())
        }
        this.cart = []
        this.toast.presentToast("Pedido para el cliente " + cliente.Nombre + " realizado correctamente.");
        this.close();
        this.router.navigateByUrl("/clientes")
      })
    } else {
      let proveedor = JSON.parse(localStorage.getItem("proveedor"));
      var date = new Date();
      let data = {
        Nombre: proveedor.Nombre,
        Entregado: false,
        fecha: this.datePipe.transform(date, 'dd-MM-yyyy'),
        Total: this.getTotal(),
        id: id
      }
      this.db.createDoc(data, "Pedidos", id).then(() => {
        for(var i = 0; i < this.cart.length; i++){
          this.db.createDoc(this.cart[i], "Pedidos/"+ id + "/Productos", this.db.createId())
        }
        this.cart = []
        this.toast.presentToast("Pedido al proveedor " + proveedor.Nombre + " realizado correctamente.");
        this.close();
        this.router.navigateByUrl("/pedidos")
      })
    }
    
  }

  verFecha(event: any){
    var fecha = event.target.value;
    var year = fecha.slice(0, 4);
    var month = fecha.slice(5, 7);
    var day = fecha.slice(8, 10);
    this.fecha = day + '-' + month + '-' + year;
  }

}
