import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.page.html',
  styleUrls: ['./listar-vehiculo.page.scss'],
})
export class ListarVehiculoPage implements OnInit {

  formularioVehiculo: FormGroup;


  constructor(private fb: FormBuilder, private router: Router) {
    this.formularioVehiculo = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      patente: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.formularioVehiculo.valid) {
      const vehiculo = this.formularioVehiculo.value;
      const vehiculos = JSON.parse(localStorage.getItem('vehiculos') || '[]');
      vehiculos.push(vehiculo);
      localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
      this.router.navigateByUrl('/vehiculo');
    }
  }

  
}
