import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarViajePage } from './agregar-viaje.page';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarViajePage', () => {
  let component: AgregarViajePage;
  let fixture: ComponentFixture<AgregarViajePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    })
    fixture = TestBed.createComponent(AgregarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
