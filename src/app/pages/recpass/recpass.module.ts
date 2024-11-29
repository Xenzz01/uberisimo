import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecpassPageRoutingModule } from './recpass-routing.module';

import { RecpassPage } from './recpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecpassPageRoutingModule
  ],
  declarations: [RecpassPage]
})
export class RecpassPageModule {}
