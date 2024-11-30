import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { environment } from 'src/environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service'; 

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        HttpClientTestingModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig), 
      ],
      providers: [
        UsuarioService, 
        { provide: AngularFireAuth, useValue: {} }, 
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
