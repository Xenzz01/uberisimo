import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Guardar un item genérico
  async setItem(llave: string, valor: string): Promise<void> {
    try {
      await Preferences.set({ key: llave, value: valor });
      console.log(`Item guardado: [${llave}] = ${valor}`);
    } catch (error) {
      console.error("Error al guardar el item en el almacenamiento:", error);
    }
  }

  // Obtener un item genérico
  async getItem(llave: string): Promise<string | null> {
    try {
      const obj = await Preferences.get({ key: llave });
      return obj.value;
    } catch (error) {
      console.error(`Error al obtener el item [${llave}] del almacenamiento:`, error);
      return null;
    }
  }

  // Agregar un token específico
  async agregarToken(dataJson: any): Promise<void> {
    try {
      await this.setItem(llaveUber, JSON.stringify(dataJson));
      console.log("Token agregado correctamente:", dataJson);
    } catch (error) {
      console.error("Error al agregar el token:", error);
    }
  }

  // Obtener el token específico
  async obtenerToken(): Promise<string | null> {
    try {
      const storageData = await this.getItem(llaveUber);
      if (!storageData) {
        console.warn("Token no encontrado en el almacenamiento.");
        return null;
      }
      const parsedData = JSON.parse(storageData);
      return parsedData?.token || null; // Devuelve solo el token si existe
    } catch (error) {
      console.error("Error al obtener el token del almacenamiento:", error);
      return null;
    }
  }

  // Obtener toda la información almacenada bajo la llave principal
  async obtenerStorage(): Promise<any[]> {
    try {
      const storageData = await this.getItem(llaveUber);
      if (!storageData) {
        console.warn("No se encontró información en el almacenamiento.");
        return [];
      }
      const parsedData = JSON.parse(storageData);
      console.log("Datos recuperados del almacenamiento:", parsedData);
      return Array.isArray(parsedData) ? parsedData : [parsedData]; // Devuelve como array para mantener compatibilidad
    } catch (error) {
      console.error("Error al obtener datos del almacenamiento:", error);
      return [];
    }
  }

  // Eliminar el token específico
  async eliminarToken(): Promise<void> {
    try {
      await Preferences.remove({ key: llaveUber });
      console.log("Token eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el token del almacenamiento:", error);
    }
  }

  // Limpiar todo el almacenamiento
  async clearStorage(): Promise<void> {
    try {
      await Preferences.clear();
      console.log("Almacenamiento limpiado correctamente.");
    } catch (error) {
      console.error("Error al limpiar el almacenamiento:", error);
    }
  }
}
