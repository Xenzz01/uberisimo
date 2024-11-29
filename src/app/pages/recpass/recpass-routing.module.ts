import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecpassPage } from './recpass.page';

const routes: Routes = [
  {
    path: '',
    component: RecpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecpassPageRoutingModule {}
