import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './app-elements/app-button/app-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule,
    CommonModule,
  ],
  declarations: [AppButtonComponent],
  exports:[AppButtonComponent]

})
export class ElementsModule { }
