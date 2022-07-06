import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import { FirestoreService } from './firestore.service';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private afauth: AngularFireAuth, private interactionservice: InteractionService, private router:Router, private db: FirestoreService) { }

  user = {
    nombre : '',
    email : '',
    image: ''
  }

  async register(email: string, password: string, nick: string, image: any){
    try {
      await this.afauth.createUserWithEmailAndPassword(email,password).then( res => {
        this.user.nombre = nick;
        this.user.email = email;
        var ruta = "users/" + email;
        this.db.subirImagen(ruta, image).then(respuesta => {
          this.user.image = respuesta;
          this.db.createDoc(this.user, "Users", email)
          res.user.updateProfile({
          displayName: nick,
          photoURL: respuesta
        })
        this.interactionservice.presentToast("Registro Completado Satisfactoriamente!")
        })       
      })
    } catch (err) {
      console.log("Error en login: " + err);
      this.interactionservice.presentToast(err);
      return null;
    }
  }


  async login(email: string, password: string){
    try {
      var aux = await this.afauth.signInWithEmailAndPassword(email,password);
      this.interactionservice.presentToast("Sesión Iniciada con Éxito")
      return aux;
    } catch (err) {
      console.log("Error en login: " + err)
      this.interactionservice.presentToast("Credenciales Inválidas")
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string){
    try {
      var aux = await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigateByUrl("/proveedores")
      return aux
    } catch (err) {
      console.log("Error en login con Google: " + err)
      return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  logOut(){
    this.afauth.signOut();
  }

  comprobarPermisos(){
    this.getUserLogged().subscribe(res => {
      if (res == null)
        this.router.navigateByUrl('')
      else
        localStorage.setItem("User", JSON.stringify(res));
    })
  }
}
