import { Component, OnInit, NgZone } from '@angular/core';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { AlerterService } from 'src/app/services/alerter/alerter.service';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location/location.service';
import { Subscription } from 'rxjs';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../../css/toolbar.scss','../../css/buttonsArea.scss','../../css/labels.scss'],
})

export class HomePage implements OnInit {
  trip:FormGroup;
 
  home_page_words:any;
  backbutton:Subscription;
  constructor(private platform:Platform,private translate:TranslateService,private fbLogin:FbLoginService,private alerter:AlerterService,
              private navCtrl:NavController,private location:LocationService) {
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
  async logout(){
    this.alerter.presentAlertConfirm(this.alerter.errors_msg.logout_question)
      .then(async(answer)=>{
            if(answer=="YES"){
              await this.fbLogin.fbLogOut().then((result)=>{
                  if(result=="LoggedOut"){
                    this.navCtrl.navigateBack('/login');
                  }
              })
            }
      })
  } 
  //============================================================================================================//
  //===================   Override the backbutton functionallity for this page  ================================//
  //============================================================================================================//
  ionViewWillEnter(){
    this.backbutton=this.platform.backButton.subscribeWithPriority(9999, () => {
      this.logout();
    });
  }

  ionViewDidLeave(){
    this.backbutton.unsubscribe();
  }
}
