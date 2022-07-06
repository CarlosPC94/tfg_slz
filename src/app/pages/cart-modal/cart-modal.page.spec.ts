import { Proveedores } from './../../models/proveedores';
import { CartProducts } from './../../models/cartProducts';
/* import { CartService } from './../../services/cart.service'; */
import { DatePipe } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { CartModalPage } from './cart-modal.page';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { CartService } from 'src/app/services/cart.service';
import { promise } from 'protractor';

describe('CartModalPage', () => {
  let component: CartModalPage;
  let fixture: ComponentFixture<CartModalPage>;
  let sut: CartModalPage;
  let collaborator: CartService;

/*   class MockCartService extends CartService{

    cart: CartProducts[] = [];

    producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 3,
      Image: "Prueba.png"
    }

    getCart(): any[] {
      this.cart.push(this.producto)
      return this.cart;
    }

  } */

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartModalPage ],
      providers: [ FirestoreService, DatePipe, ModalController, CartService],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    fixture = TestBed.createComponent(CartModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('decrease product', () => {
    collaborator = new CartService();
    sut = new CartModalPage(collaborator, new ModalController(undefined, undefined, undefined), new FirestoreService(undefined), new DatePipe(undefined));

    var cart: CartProducts[] = [];
    var producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 1,
      Image: "Prueba.png"
    }

    cart.push(producto);

    collaborator.getCart = () => cart;
    sut.ngOnInit();  
    console.log(sut.cart);
    sut.decreaseCartItem(producto);
    console.log(sut.cart);


    expect(sut.cart).toEqual([]);
  });

  it('should close', () => {
    const app = fixture.componentInstance;
    expect(app.close()).toBeUndefined();
  });

  it('increase producto', () => {
    collaborator = new CartService();
    sut = new CartModalPage(collaborator, new ModalController(undefined, undefined, undefined), new FirestoreService(undefined), new DatePipe(undefined));

    var cart: CartProducts[] = [];
    var expected: CartProducts[] = [];
    var producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 1,
      Image: "Prueba.png"
    }

    collaborator.getCart = () => cart;

    sut.ngOnInit();
    sut.increaseCartItem(producto);

    expected.push(producto);
    
    expect(sut.cart).toEqual(expected);
  });

  it('remove product', () => {
    collaborator = new CartService();
    sut = new CartModalPage(collaborator, new ModalController(undefined, undefined, undefined), new FirestoreService(undefined), new DatePipe(undefined));

    var cart: CartProducts[] = [];
    var producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 1,
      Image: "Prueba.png"
    }

    cart.push(producto);

    collaborator.getCart = () => cart;
    sut.ngOnInit();  
    console.log(sut.cart);
    sut.removeCartItem(producto);
    console.log(sut.cart);


    expect(sut.cart).toEqual([]);
  });

  it('total order price', () => {
    collaborator = new CartService();
    sut = new CartModalPage(collaborator, new ModalController(undefined, undefined, undefined), new FirestoreService(undefined), new DatePipe(undefined));

    var cart: CartProducts[] = [];
    var producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 1,
      Image: "Prueba.png"
    }

    cart.push(producto);

    collaborator.getCart = () => cart;
    sut.ngOnInit();  
    sut.getTotal();


    expect(sut.getTotal()).toEqual(5);
  });

  it('create order', () => {
    let collaborator1 = new FirestoreService(undefined);
    let collaborator2 = new DatePipe(undefined)
    sut = new CartModalPage(new CartService(), new ModalController(undefined, undefined, undefined), collaborator1, collaborator2);

    var cart: CartProducts[] = [];
    var producto: CartProducts = {
      Nombre: "Prueba",
      Precio: 5,
      Cantidad: 1,
      Image: "Prueba.png"
    }

    var data: Proveedores = {
      Nombre: "Prueba",
      Categoria: "Prueba",
      Email: "Prueba@prueba.com",
      Movil: "666555444"
    }

    localStorage.setItem("proveedor", JSON.stringify(data));

    cart.push(producto);

    collaborator1.createId = () => "1";
    collaborator1.createDoc = () => null;

    sut.ngOnInit();  
    sut.checkout();


    expect(sut.cart).toEqual([]);
  });
});
