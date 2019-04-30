import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FbLoginPage } from './fb-login.page';
import { ElementsModule } from 'src/app/elements/elements.module';


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
    ElementsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FbLoginPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FbLoginPageModule {}
