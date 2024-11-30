import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  correo: string = "";
  contrasena: string = "";
  token: string = "";
  usuario: UserModel[] = []; 

  constructor(
    private router: Router,
    private storage: StorageService,
    private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL ---> ", this.correo);
    if (this.correo) {
      this.cargarUsuario();
    } else {
      console.error("El parámetro correo no está presente en la URL.");
    }
  }

  async cargarUsuario() {
    try {
      let dataStorage = await this.storage.obtenerStorage();
      console.log("Datos recuperados del almacenamiento:", dataStorage);

      // Comprobamos si los datos existen y tienen la estructura esperada
      if (dataStorage && dataStorage.length > 0 && dataStorage[0].usuario_correo) {
        const req = await this.usuarioService.obtenerUsuario({
          p_correo: dataStorage[0].usuario_correo,
          token: dataStorage[0].token
        });

        if (req && req.data) {
          this.usuario = req.data;
          console.log("DATA INICIO USUARIO", this.usuario);
        } else {
          console.error("No se encontraron datos de usuario en la respuesta.");
        }
      } else {
        console.error("No se encontró información de usuario en el almacenamiento o la estructura es incorrecta.");
      }
    } catch (error) {
      console.error("Error al cargar usuario desde el almacenamiento:", error);
    }
  }

  editarPerfil() {
    this.router.navigateByUrl('/mod-perfil');
  }
}
