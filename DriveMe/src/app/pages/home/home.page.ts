import { Component, OnInit, NgZone } from '@angular/core';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { AlerterService } from 'src/app/services/alerter/alerter.service';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GoogleMapsService } from 'src/app/services/googleMaps/google-maps.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
 
  home_page_words:any;
  constructor(private platform:Platform,private translate:TranslateService,private fbLogin:FbLoginService,private alerter:AlerterService,
              private navCtrl:NavController,private googleMaps:GoogleMapsService) {
    this.platform.ready().then(async()=>{ // Now safe to use
                                          // Get the messages and the words for this page from assets/i18n/language.json file
          this.translate.get('home_page').subscribe((res) => {
          this.home_page_words=res;
          });
    })    
  }
  ngOnInit() {
    
     
  }

  goToMap(){
    this.navCtrl.navigateForward('map-directions');
  }

  //============================================================================================================//
  //===================   on Log-out, alert user to ensure, then navigate back  ================================//
  //============================================================================================================//
  async Logout(){
    this.alerter.presentAlertConfirm(this.alerter.errors_msg.logout_question)
      .then(async(answer)=>{
            if(answer=="YES"){
              await this.fbLogin.fbLogOut().then((result)=>{
                  if(result=="LoggedOut"){
                    this.navCtrl.navigateBack('/fb-login');
                  }else{
                    this.alerter.toastMessage(this.alerter.errors_msg.facebook_logout_error);
                  }
              })
            }
      })
  } 

}
