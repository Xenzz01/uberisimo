import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let storageServiceMock: any;
  let usuarioServiceMock: any;

  beforeEach(() => {
    storageServiceMock = {
      obtenerStorage: jasmine.createSpy().and.returnValue(Promise.resolve([{ usuario_correo: 'asd123', token: 'abc123' }])),
    };

    usuarioServiceMock = {
      obtenerUsuario: jasmine.createSpy().and.returnValue(Promise.resolve({ data: [{ id_usuario: 1, correo_electronico: 'asd123' }] })),
    };

    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [
        { provide: StorageService, useValue: storageServiceMock },
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { correo: 'asd123' } } } },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy() } }
      ]
    });

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data', async () => {
    await component.cargarUsuario();
    expect(component.usuario.length).toBeGreaterThan(0);
    expect(component.usuario[0].correo_electronico).toBe('asd123');
  });
});
