import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  async agregarVehiculo(datosVehiculo:dataBodyAuto, imgFileUser:any, ){
    try {
      const formData = new FormData();

      formData.append('p_id_vehiculo', datosVehiculo.p_id_vehiculo.toString());
      formData.append('p_marca',datosVehiculo.marca);
      formData.append('p_modelo ', datosVehiculo.modelo);
      formData.append('p_color', datosVehiculo.color);
      formData.append('p_patente', datosVehiculo.patente);
      formData.append('p_anio', datosVehiculo.anio.toString());
      formData.append('p_tipo_de_combustible', datosVehiculo.tipo_combustible);
      if (datosVehiculo.token) {
        formData.append('token',datosVehiculo.token);
      }
  
      formData.append('image_usuario', imgFileUser.file, imgFileUser.name);
  
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/obtener',formData));
      return response;
      
    } catch (error) {
      throw error;
    }

  }
  
  async obtenerVehiculo(data:dataGetUser){
    try {
      const params = {
        
        token:data.token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'vehiculo/obtener',{params}));
      return response;
    } catch (error) {
      throw error;
    }
  }

}


interface dataBodyAuto{
  p_id_vehiculo: number;
  patente:string;
  marca:string;
  modelo:string;
  anio:number;
  color:string;
  tipo_combustible:string;
  token?:string;
}

interface dataGetUser{
  p_correo:string;
  token:string;
}