import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  apiKey: any = 'AIzaSyCWge2f_U45b8smjo65isswwyvbs7UeBCY'; 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //===========  use english as deafault ========//
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      //=========== use google api key ==============
      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey+'&v=3.exp&libraries=places&language=en';
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=&language=en';
      }
      document.head.appendChild(script);

   
    });
  }
}
