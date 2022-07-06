import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { MenuNormalComponent } from './menu-normal.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuNormalComponent', () => {
  let component: MenuNormalComponent;
  let fixture: ComponentFixture<MenuNormalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNormalComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)],
        providers: [AuthService, MenuController]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app.openFirst()).toBeUndefined();
  });

  it('Abrir final', () => {
    const app = fixture.componentInstance;
    expect(app.openEnd()).toBeUndefined();
  });

  it('open custom', () => {
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.openCustom()).toBeUndefined();
  });

  it('logout', () => {
    const app = fixture.componentInstance;
    expect(app.cerrarSesion()).toBeUndefined();
  });
});
