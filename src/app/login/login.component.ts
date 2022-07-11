import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public usuario = {
      email : '',
      password: '',
      Nombre : '', 
      image: ''
  }
  constructor(private route:Router, private authService: AuthService, private db: FirestoreService) { }

  ngOnInit() {
  }

  

  login(){
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      if(res == null)
        console.log("Registro Incorrecto!")
        else {
          this.route.navigateByUrl("/proveedores")
        }
    })
  }

  async loginWithGoogle(){
    /* this.route.navigate(['/folder/Inbox']); */
    const { email, password } = this.usuario;
    await this.authService.loginWithGoogle(email, password).then(res => {
      console.log("Registro Correcto!", res)
    })

    try {
      var aux = this.authService.getUserLogged().subscribe(res => {
        this.usuario.email = res.email;
        this.usuario.Nombre = res.displayName;
        this.usuario.image = res.photoURL;
        this.db.createDoc(this.usuario, "Users", this.usuario.email)
      })    
    } catch (err) {
      console.log(err);
    }
  }

}
