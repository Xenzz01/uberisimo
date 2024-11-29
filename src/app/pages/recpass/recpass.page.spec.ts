import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecpassPage } from './recpass.page';

describe('RecpassPage', () => {
  let component: RecpassPage;
  let fixture: ComponentFixture<RecpassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
