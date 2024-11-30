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
      // Obtener datos de almacenamiento local
      let dataStorage = await this.storage.obtenerStorage();
      const token = dataStorage[0].token;
      const usuarioId = dataStorage[0].usuario_id;

      // Llamar al servicio para obtener los vehículos
      const req = await this.vehiculoService.obtenerVehiculo(token);

      if (req && req.data) {
        // Asignar los vehículos obtenidos y agregar una propiedad showDetails para la visualización
        this.vehiculos = req.data.map((vehiculo: any) => ({
          ...vehiculo,
          showDetails: false // Añadir una propiedad para mostrar los detalles
        }));
        console.log("DATA VEHICULOS OBTENIDOS", this.vehiculos);
      } else {
        console.error('No se encontraron datos de vehículos.');
      }
    } catch (error) {
      console.error('Error al cargar los vehículos:', error);
    }
  }

  agregarVehiculo() {
    // Navegar a la vista para agregar un nuevo vehículo
    this.router.navigateByUrl('/listar-vehiculo');
  }

  toggleDetails(vehiculo: any) {
    // Alternar la visibilidad de los detalles del vehículo
    vehiculo.showDetails = !vehiculo.showDetails;
  }
}
