import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient,
              private router:Router
  ) { }

  async obtenerViaje(parToken:string){
    try {
      const params = {
        token:parToken
      };
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener',{params}));
      return response;
    } catch (error) {
      throw error;
    }
  }


  async agregarViaje(data:bodyViaje){
    try {
    const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar',data));
    return response;
    
   } catch (error) {
    throw error;
   }

  }


 
}


  


interface bodyViaje{
  p_id_usuario:number;
  p_ubicacion_origen:string;
  p_ubicacion_destino:string;
  p_costo:number;
  p_id_vehiculo:number;
  token:string;

}