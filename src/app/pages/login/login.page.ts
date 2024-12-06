import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private storageService: StorageService,
    private router: Router
  ) {}

  // Método de inicio de sesión
  async login() {
    if (!this.correo || !this.contrasena) {
      this.helper.showAlert('Por favor, ingrese el correo y la contraseña.', 'Validación');
      return;
    }

    const loader = await this.helper.showLoader('Iniciando sesión...');
    try {
      // Llamada al servicio de autenticación
      const response = await this.firebaseService.login(this.correo, this.contrasena);
      console.log('Inicio de sesión exitoso:', response.user?.uid);

      // Obtener el token del usuario autenticado
      const token = await response.user?.getIdToken();
      if (token) {
        // Guardar el token y los datos del usuario en el almacenamiento
        const userData = {
          token,
          email: response.user?.email,
          uid: response.user?.uid,
        };

        await this.storageService.agregarToken(userData);
        console.log('Token almacenado:', userData);

        // Mostrar un mensaje de éxito y redirigir al dashboard
        await this.helper.showToast('Inicio de sesión exitoso.');
        this.router.navigateByUrl('/inicio');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      this.helper.showAlert(this.getErrorMessage(error), 'Error');
    } finally {
      loader.dismiss();
    }
  }

  // Método para mostrar el mensaje de error correcto
  private getErrorMessage(error: any): string {
    if (error.code === 'auth/user-not-found') {
      return 'Usuario no encontrado. Verifica tu correo.';
    } else if (error.code === 'auth/wrong-password') {
      return 'Contraseña incorrecta.';
    } else if (error.code === 'auth/invalid-email') {
      return 'Correo no válido.';
    } else {
      return 'Error desconocido. Intenta nuevamente.';
    }
  }

  // Redirigir a la página de recuperación de contraseña
  resetPw() {
    this.router.navigateByUrl('/recpass');
  }

  // Redirigir a la página de registro
  registro() {
    this.router.navigateByUrl('/registro');
  }
}
