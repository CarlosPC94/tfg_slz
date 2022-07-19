import { Primas } from 'src/app/models/primas';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
})
export class CrearProductoComponent implements OnInit {


  nombrePag: string;
  materia = {
    Nombre: "",
    Precio: "",
    Foto: "",
    Cantidad: 1,
    Descripcion: "",
    Categoria: "", 
    Restante: 0,
    Aviso: 0
  }
  image: any;
  previsualizacion: string;

  constructor(private db: FirestoreService, private toast: InteractionService, private router: Router) { }

  ngOnInit() {
    this.nombrePag = "Crear Producto"
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
    this.db.createDocWithImage(this.materia, "Productos", this.db.createId()).then(() => {
      this.toast.presentToast("Producto añadido Satisfactoriamente");
      this.router.navigateByUrl("/stock")
    })
  }

}
