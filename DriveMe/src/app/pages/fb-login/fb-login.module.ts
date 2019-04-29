import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FbLoginPage } from './fb-login.page';
import { AppButtonComponent } from 'src/app/app-elements/app-button/app-button.component';

const routes: Routes = [
  {
    path: '',
    component: FbLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FbLoginPage,AppButtonComponent]
})
export class FbLoginPageModule {}
