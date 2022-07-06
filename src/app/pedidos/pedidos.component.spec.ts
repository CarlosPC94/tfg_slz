import { FirestoreService } from 'src/app/services/firestore.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosComponent } from './pedidos.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

describe('PedidosComponent', () => {
  let component: PedidosComponent;
  let fixture: ComponentFixture<PedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosComponent],
      providers: [FirestoreService],
      imports: [IonicModule.forRoot(), RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get Pedidos', () => {
    expect(component).toBeTruthy();
  });

  it('Display Pedidos', () => {
    expect(component).toBeTruthy();
  });

  it('Ordenar Pedidos', () => {
    expect(component).toBeTruthy();
  });
});
