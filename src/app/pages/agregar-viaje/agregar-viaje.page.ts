import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-agregar-viaje',
  templateUrl: './agregar-viaje.page.html',
  styleUrls: ['./agregar-viaje.page.scss'],
})
export class AgregarViajePage implements OnInit {
  costo: number = 0;
  ubicacionOrigen: string = '';
  ubicacionDestino: string = '';
  idVehiculoSeleccionado: number = 0; 
  vehiculos: any[] = []; 

  constructor(
    private viajeService: ViajeService,
    private usuarioService: UsuarioService,
    private storage: StorageService, 
    private carService:VehiculoService
  ) {}

  async ngOnInit() {
    await this.cargarVehiculos(); 
  }

  async cargarVehiculos() {
    
    const dataStorage = await this.storage.obtenerStorage();
    const token = dataStorage[0].token;
    const usuarioId = dataStorage[0].usuario_id;

    
    const req = await this.carService.obtenerVehiculo(token);
    if (req && req.data) {
      this.vehiculos = req.data;
    }
  }

  async agregarViaje() {
    try {
      // Obtener los datos de almacenamiento local
      const dataStorage = await this.storage.obtenerStorage();
      const token = dataStorage[0].token;
      const usuarioId = dataStorage[0].usuario_id;

      // Llamar al servicio para agregar el viaje
      const req = await this.viajeService.agregarViaje(
        {
          p_costo: this.costo,
          p_id_usuario: usuarioId,
          p_id_vehiculo: this.idVehiculoSeleccionado,
          p_ubicacion_destino: this.ubicacionDestino,
          p_ubicacion_origen: this.ubicacionOrigen,
          token: token
        }
      );

      console.log("Viaje agregado correctamente:", req);
    } catch (error) {
      console.error("Error al agregar viaje:", error);
    }
  }
}
