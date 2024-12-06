import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  correo: string = '';
  usuario: UserModel[] = [];

  constructor(
    private router: Router,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Capturar el correo desde queryParams
    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (params['correo']) {
        this.correo = params['correo'];
        console.log('Correo recibido desde queryParams:', this.correo);

        // Cargar la información del usuario
        await this.cargarUsuario();
      } else {
        console.error('No se recibió el parámetro correo en queryParams.');
      }
    });
  }

  async cargarUsuario() {
    try {
      // Recuperar datos del almacenamiento
      const dataStorage = await this.storage.obtenerStorage();
      console.log('Datos recuperados del almacenamiento:', dataStorage);

      if (dataStorage && dataStorage.length > 0) {
        const token = dataStorage[0]?.token;
        if (this.correo && token) {
          // Llamar al servicio para obtener los datos del usuario
          const response = await this.usuarioService.obtenerUsuario({
            p_correo: this.correo,
            token: token,
          });

          if (response && response.data) {
            this.usuario = response.data;
            console.log('Datos del usuario cargados:', this.usuario);
          } else {
            console.error('No se encontró información del usuario en la respuesta del backend.');
          }
        } else {
          console.error('No se encontró el token o el correo no está definido.');
        }
      } else {
        console.error('No se encontró información en el almacenamiento.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  editarPerfil() {
    this.router.navigateByUrl('/mod-perfil');
  }
}
