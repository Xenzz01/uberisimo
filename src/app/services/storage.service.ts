import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  async setItem(llave: string, valor: string): Promise<void> {
    try {
      await Preferences.set({ key: llave, value: valor });
    } catch (error) {
      console.error("Error al guardar el item en el almacenamiento:", error);
    }
  }

 
  async getItem(llave: string): Promise<string | null> {
    try {
      const obj = await Preferences.get({ key: llave });
      return obj.value;
    } catch (error) {
      console.error("Error al obtener el item del almacenamiento:", error);
      return null;
    }
  }

  
  async agregarToken(dataJson: any): Promise<void> {
    try {
      await this.setItem(llaveUber, JSON.stringify(dataJson));
    } catch (error) {
      console.error("Error al agregar el token:", error);
    }
  }

  
  async obtenerStorage(): Promise<any> {
    try {
      const storageData = await this.getItem(llaveUber);
      if (storageData === null) {
        return {};  
      } else {
        return JSON.parse(storageData);
      }
    } catch (error) {
      console.error("Error al obtener datos del almacenamiento:", error);
      return {};  
    }
  }
}
