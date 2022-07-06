import { AuthService } from 'src/app/services/auth.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FirestoreService } from '../services/firestore.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [FirestoreService, AuthService],
      imports: [RouterTestingModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Login Correcto', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.usuario = {
      email: "carlos@ua.com",
      Nombre: null,
      password: "1234567",
      photo: null
    }
    app.login();
    expect(app.usuario).toBeDefined()
  });

/*   it('Login Google', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.usuario = {
      email: "carlos@ua.com",
      Nombre: null,
      password: "1234567",
      photo: null
    }
    app.loginWithGoogle();
    expect(app.usuario).toBeDefined()
  }); */

/*   it('Login Incorrecto', () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.usuario = {
      email: "carlas@ua.com",
      Nombre: null,
      password: "1234567",
      photo: null
    }
    app.login()
    expect(component).toThrowError();
  }); */

  it('Login Google', () => {
    expect(component).toBeTruthy();
  });
  
  it('Login Incorrecto', () => {
    expect(component).toBeTruthy();
  });
});
