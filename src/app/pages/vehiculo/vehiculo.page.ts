import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { VehiculoService } from 'src/app/services/vehiculo.service'; // Importa el servicio de Vehículos
import { StorageService } from 'src/app/services/storage.service'; // Importa el servicio de almacenamiento

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  vehiculos: any[] = [];
  storageService: any;

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService, 
    private storage: StorageService 
    ) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  async cargarVehiculos() {
    try {
      const token = await this.storageService.obtenerToken();
      if (!token) {
        console.error('Token no encontrado, redirigiendo al login.');
        return;
      }
  
      const req = await this.vehiculoService.obtenerVehiculo({
        token,
        p_correo: ''
      });
      console.log('Respuesta de vehículos:', req);
  
      if (Array.isArray(req) && req.length > 0) {
        this.vehiculos = req.map((vehiculo: any) => ({
          id: vehiculo.id,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          color: vehiculo.color,
          anio: vehiculo.anio,
        }));
      } else {
        console.warn('No se encontraron vehículos.');
        this.vehiculos = [];
      }
    } catch (error) {
      console.error('Error al cargar los vehículos:', error);
    }
  }

  agregarVehiculo() {
    
    this.router.navigateByUrl('/listar-vehiculo');
  }

  toggleDetails(vehiculo: any) {
    // Alternar la visibilidad de los detalles del vehículo
    vehiculo.showDetails = !vehiculo.showDetails;
  }
}
