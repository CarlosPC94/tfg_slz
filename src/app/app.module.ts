import { CrearMateriaComponent } from './proveedores/realizar-pedido-proveedor/crear-materia/crear-materia.component';
import { CrearProveedorComponent } from './proveedores/crear-proveedor/crear-proveedor.component';
import { ConsultarEmpleadoComponent } from './empleados/consultar-empleado/consultar-empleado.component';
import { RegistrarEmpleadoComponent } from './empleados/registrar-empleado/registrar-empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ConsultarProveedorComponent } from './proveedores/consultar-proveedor/consultar-proveedor.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MenuNormalComponent } from './menu-normal/menu-normal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RealizarPedidoProveedorComponent } from './proveedores/realizar-pedido-proveedor/realizar-pedido-proveedor.component';
import { CartModalPage } from './pages/cart-modal/cart-modal.page';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ConsultarPedidoComponent } from './pedidos/consultar-pedido/consultar-pedido.component';
import { ClientesComponent } from './clientes/clientes.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, ProveedoresComponent, MenuNormalComponent, PerfilComponent,
   CustomHeaderComponent, RealizarPedidoProveedorComponent, CartModalPage, PedidosComponent, ConsultarPedidoComponent,
   ConsultarProveedorComponent, EmpleadosComponent, RegistrarEmpleadoComponent, ConsultarEmpleadoComponent, CrearProveedorComponent,
   CrearMateriaComponent, ClientesComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule,
     RouterModule, FormsModule, ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule, AngularFireStorageModule, NgxStarRatingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}