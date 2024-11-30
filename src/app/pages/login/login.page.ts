import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string ="";
  contrasena:string = "";
  token:string = "";
  usuario:UserModel[] = [];



  constructor(private router:Router, 
              private firebase:FirebaseService, 
              private helper:HelperService,
              private storage:StorageService,
              private usuarioService:UsuarioService
            
            ) { }

  ngOnInit() {
  }


  async login(){
  
    if (this.correo == "") {
      this.helper.showAlert("Ingrese el correo", "Error de validación");
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese la contraseña", "Error de validación");
      return;
    }
    /* if (this.correo == "123" && this.contrasena == '123') {
      this.router.navigateByUrl("/inicio");
    }else{
      alert("Credenciales incorrectas.");
    } */

      const loader = await this.helper.showLoader("Cargando");
      try {
  
        const reqFirebase = await this.firebase.login(this.correo,this.contrasena);
        //solicitud get user
        const token = await reqFirebase.user?.getIdToken();
  
        if (token) {
          this.token = token;
          const req = await this.usuarioService.obtenerUsuario(
            {
              p_correo:this.correo,
              token:token
            }
          );
          this.usuario = req.data;
          console.log("DATA USUARIO", this.usuario[0].id_usuario);
          
        }
        
        loader.dismiss();
      } catch (error:any) {
        
        let msg = "error al iniciar sesión.";
        
        if(error.code == "auth/invalid-credential1"){
          msg = "Credenciales incorrectas.";
        }else if(error.code == "auth/wrong-password1"){
          msg = "Contraseña incorrecta.";
        }else if(error.code == "auth/invalid-email1"){
          msg = "Correo no valido.";
        }
  
  
        this.helper.showAlert(msg,"Aceptar");
        loader.dismiss();
      }
  
      const jsonToken = 
      [
        {
          "token":this.token,
          "usuario_id":this.usuario[0].id_usuario,
          "usuario_correo":this.usuario[0].correo_electronico
        }
      ];
  
      this.storage.agregarToken(jsonToken);
  
  
  
      //Obtenemos la info que guardamos en storage
      let token = await this.storage.obtenerStorage();
      console.log(token[0].usuario_correo);
      
      await this.helper.showToast("Login correcto!!!!!");
      this.router.navigateByUrl("/inicio");
    }
  
    resetPw(){
      this.router.navigateByUrl("reset-password");
    }
  
    registro(){
      this.router.navigateByUrl("registro");
    }

}