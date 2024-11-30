import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {


  viajes:any[]=[];
  

  constructor(private activateroute: ActivatedRoute,
              private viajeService:ViajeService,
              private storage:StorageService,
              private router:Router

   ) {}

  ngOnInit() {
    this.cargarViajes();
  }

  detalles(viaje: any) {
    viaje.showDetails = !viaje.showDetails;
  }

  async cargarViajes() {
    try {
      
      let dataStorage = await this.storage.obtenerStorage();
  
      if (dataStorage && dataStorage.length > 0) {
        
        const req = await this.viajeService.obtenerViaje(dataStorage[0].token);
  
        if (req && req.data) {
          this.viajes = req.data;
          console.log("DATA VIAJES OBTENIDOS", this.viajes);
        } else {
          console.error("No se encontraron datos de viajes en la respuesta.");
        }
      } else {
        console.error("No se encontró información en el almacenamiento.");
      }
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    }
  }
  

  agregarViaje(){
    this.router.navigateByUrl("");
  }
  
}