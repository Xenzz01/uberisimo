import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModPerfilPage } from './mod-perfil.page';

describe('ModPerfilPage', () => {
  let component: ModPerfilPage;
  let fixture: ComponentFixture<ModPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
