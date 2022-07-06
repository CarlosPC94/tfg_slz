import { InteractionService } from './../../../services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss'],
})
export class CrearMateriaComponent implements OnInit {

  nombrePag: string;
  materia = {
    Nombre: "",
    Precio: "",
    Foto: "",
    Cantidad: 1,
    Descripcion: "",
    Categoria: ""
  }

  image: any;
  previsualizacion: string;

  proveedor: any;

  constructor(private db: FirestoreService, private toast: InteractionService, private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Crear Materia";
    this.proveedor = JSON.parse(localStorage.getItem("proveedor"));
    console.log(this.proveedor)
  }

  capturarImagen(event: any){
    this.image = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.image[0]);
    reader.onloadend = () => {
      this.image = reader.result;
      this.materia.Foto = this.image;
      this.previsualizacion = this.materia.Foto;
    }
  }

  crearProducto(){
    this.db.createDocWithImage(this.materia, "Proveedores/"+ this.proveedor.Email + "/Productos", this.db.createId()).then(() => {
      this.toast.presentToast("Producto añadido Satisfactoriamente");
      this.router.navigateByUrl("/realizarPedidoProveedor")
    })
  }

}
