import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rec-pass',
  templateUrl: './rec-pass.page.html',
  styleUrls: ['./rec-pass.page.scss'],
})
export class RecPassPage implements OnInit {
  formRecuperar: FormGroup;

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    public alertController: AlertController
  ) {
    this.formRecuperar = this.fb.group({
      'nombre': ['', Validators.required],
      'nuevaPassword': ['', Validators.required],
      'confirmarPassword': ['', Validators.required],
    });
  }

  ngOnInit() {}

  async recuperarPassword() {
    const f = this.formRecuperar.value;
    const usuario = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null;

    if (!usuario || usuario.nombre !== f.nombre) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de usuario no existe.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (f.nuevaPassword !== f.confirmarPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    usuario.password = f.nuevaPassword;
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Contraseña cambiada correctamente.',
      buttons: ['OK'],
    });
    await alert.present();


    this.router.navigateByUrl('/login');
  }
}
