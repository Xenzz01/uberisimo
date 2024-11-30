import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  correo:string ="";
  contrasena:string = "";
  token:string = "";
  usuario:UserModel[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private usuarioService:UsuarioService,
    private storage:StorageService
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL ---> ", this.correo);
  }

  irAPerfil() {
    
    this.router.navigate(['/perfil']);
  }

  viaje() {
    let destino = "burkina faso";
    this.router.navigateByUrl('viaje/' + destino);
  }

  vehiculo() {
    let marca = "toyota";
    this.router.navigateByUrl('vehiculo/' + marca);
  }

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Sesion cerrada.',
      buttons: ['OK'],
    });

    await alert.present();
    this.router.navigateByUrl('login');
  }

  async cargarUsuario() {
    let dataStorage = await this.storage.obtenerStorage();
    console.log("Data recuperada del almacenamiento:", dataStorage);
  
    if (dataStorage && dataStorage.length > 0) {
      this.correo = dataStorage[0].usuario_correo; 
      const req = await this.usuarioService.obtenerUsuario({
        p_correo: dataStorage[0].usuario_correo,
        token: dataStorage[0].token
      });
      this.usuario = req.data;
      console.log("DATA INICIO USUARIO", this.usuario);
    } else {
      console.error("No se encontró información de usuario en el almacenamiento");
    }
  }
  
}
