import { CrearMateriaComponent } from './proveedores/realizar-pedido-proveedor/crear-materia/crear-materia.component';
import { CrearProveedorComponent } from './proveedores/crear-proveedor/crear-proveedor.component';
import { ConsultarEmpleadoComponent } from './empleados/consultar-empleado/consultar-empleado.component';
import { RegistrarEmpleadoComponent } from './empleados/registrar-empleado/registrar-empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ConsultarProveedorComponent } from './proveedores/consultar-proveedor/consultar-proveedor.component';
import { ConsultarPedidoComponent } from './pedidos/consultar-pedido/consultar-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RealizarPedidoProveedorComponent } from './proveedores/realizar-pedido-proveedor/realizar-pedido-proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'realizarPedidoProveedor',
    component: RealizarPedidoProveedorComponent
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./pages/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'consultarPedido',
    component: ConsultarPedidoComponent
  },
  {
    path: 'consultarProveedor',
    component: ConsultarProveedorComponent
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'registrarEmpleado',
    component: RegistrarEmpleadoComponent
  },
  {
    path: 'consultarEmpleado',
    component: ConsultarEmpleadoComponent
  },
  {
    path: 'crearProveedor',
    component: CrearProveedorComponent
  },
  {
    path: 'crearMateria',
    component: CrearMateriaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
