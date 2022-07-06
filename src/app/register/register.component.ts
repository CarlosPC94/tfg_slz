import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public usuario = {
    email : '',
    password : '',
    nombre: '',
    photo: ''
  }

  image: any;
  previsualizacion: string;

  constructor(private route:Router, private authService: AuthService, private firestore: FirestoreService) { }

  ngOnInit() {}

  SignIn(){
    const { email, password, nombre, photo } = this.usuario;
    this.authService.register(email, password, nombre, photo)
  }

  cargarImagen(event: any){
    this.image = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.image[0]);
    reader.onloadend = () => {
      this.image = reader.result;
      this.usuario.photo = this.image;
      this.previsualizacion = this.image;
    }
  }

  goLogin(){
    this.route.navigateByUrl("/")
  }

}
