import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultarPedidoClienteComponent } from './consultar-pedido-cliente.component';

describe('ConsultarPedidoClienteComponent', () => {
  let component: ConsultarPedidoClienteComponent;
  let fixture: ComponentFixture<ConsultarPedidoClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPedidoClienteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
