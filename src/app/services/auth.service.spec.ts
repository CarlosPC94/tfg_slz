import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { InteractionService } from './interaction.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { BehaviorSubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

/*   const email: string = 'email';
  const password: string = 'password';

  const authStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      }
    }
  }; */

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [/* {provide: AngularFireAuth, useValue: authStub} */ AngularFireAuth, FirestoreService, 
         InteractionService]
    });
    service = TestBed.inject(AuthService);
  });

/*   authStub.authState = of(null); */

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Firebase login', () => {
    expect(service).toBeTruthy();
  });

  it('Firebase login google', () => {
    expect(service).toBeTruthy();
  });

  it('Firebase register', () => {
    expect(service).toBeTruthy();
  });
});
