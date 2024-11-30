import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecPassPageRoutingModule } from './rec-pass-routing.module';

import { RecPassPage } from './rec-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecPassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecPassPage]
})
export class RecPassPageModule {}
