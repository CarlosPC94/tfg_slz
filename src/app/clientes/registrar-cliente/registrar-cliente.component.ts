import { InteractionService } from './../../services/interaction.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss'],
})
export class RegistrarClienteComponent implements OnInit {

  user = {
    Nombre: '',
    Apellidos: '',
    email: '',
    Movil: '',
    image: 'https://firebasestorage.googleapis.com/v0/b/salzillo-3de06.appspot.com/o/users%2Flogo%20simple%20copia.png?alt=media&token=c8703d1a-0e46-4a6e-ad8c-57fe7e055bf3',
    Registrado: false,
    Baneado: false
  }

  constructor(private db: FirestoreService, private router: Router, private toast: InteractionService) { }

  ngOnInit() {}

  registrarCliente(){
    this.db.createDoc(this.user, "Users", this.user.email).then(() => {
      this.toast.presentToast("Cliente creado con éxito.")
    }).catch(() => {
      this.toast.presentToast("El email o teléfono registrados ya se encuentran en uso.")
    })
  }

}
