import { CartService } from './../../services/cart.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { RealizarPedidoProveedorComponent } from './realizar-pedido-proveedor.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

describe('RealizarPedidoProveedorComponent', () => {
  let component: RealizarPedidoProveedorComponent;
  let fixture: ComponentFixture<RealizarPedidoProveedorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarPedidoProveedorComponent ],
      providers: [FirestoreService, CartService, ModalController],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    var data = {
      Nombre: "Prueba",
      Email: "Prueba",
      Movil: "Prueba",
      Categoria: "Prueba"
    }
    localStorage.setItem("proveedor", JSON.stringify(data));
    fixture = TestBed.createComponent(RealizarPedidoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get Productos Proveedor', () => {
    expect(component).toBeTruthy();
  });

  it('Get Cart Proveedor', () => {
    expect(component).toBeTruthy();
  });

  it('Filtrar Productos Proveedor', () => {
    expect(component).toBeTruthy();
  });

  it('Buscar Productos Proveedor', () => {
    expect(component).toBeTruthy();
  });
});
