import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartProducts } from './../../models/cartProducts';
import { FirestoreService } from 'src/app/services/firestore.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultarPedidoComponent } from './consultar-pedido.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { Observable, of } from 'rxjs';


describe('ConsultarPedidoComponent', () => {
  let component: ConsultarPedidoComponent;
  let fixture: ComponentFixture<ConsultarPedidoComponent>;



/*   class McokFireService extends FirestoreService {
    data = {
      Nombre: "Prueba",
      Precio: 4,
      Cantidad: 3,
      Imagen: "prueba.png"
    }
    getCollection(path: string){
      return this.data;
    }
  } */

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPedidoComponent ],
      providers: [ FirestoreService,/* {provide: FirestoreService, useClass: McokFireService} */],
      imports: [IonicModule.forRoot(), RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    var pedido = {
      Nombre: "Prueba",
      fecha: "12/12/12",
      Entregado: false,
      Total: 5
    }
    
    localStorage.setItem("pedidoId", "Wx96DrUF4zO6XFWI3K5h");
    localStorage.setItem("pedido", JSON.stringify(pedido))
    fixture = TestBed.createComponent(ConsultarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get Pedido', () => {
    expect(component).toBeTruthy();
  });

  it('Display Pedido', () => {
    expect(component).toBeTruthy();
  });
});
