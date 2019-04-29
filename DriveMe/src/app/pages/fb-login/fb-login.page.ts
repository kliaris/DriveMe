import { Component, OnInit } from '@angular/core';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlerterService } from 'src/app/services/alerter/alerter.service';


@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.page.html',
  styleUrls: ['./fb-login.page.scss'],
})
export class FbLoginPage implements OnInit {
  login_page_words:any;

  constructor(private platform:Platform, private fbLogin:FbLoginService,private navCtrl:NavController,private translate:TranslateService,
              private alerter:AlerterService) {
    this.platform.ready().then(async()=>{ // Now safe to use
                                          // Get the messages and the words for this page from assets/i18n/language.json file
      this.translate.get('login_page').subscribe((res) => {
        console.log(res);
           this.login_page_words=res;
      });
    })     
  }

  ngOnInit() {
  }
  //============================================================================================================//
  //==============  on Login, call Facebook-login Service,if succeed then naviagte forward   ===================//
  //============================================================================================================//
  async Login(){
      await this.fbLogin.fbLogIn()
      .then((response)=>{
          if(response=="LoggedIn"){
            this.navCtrl.navigateForward('/home');
          }else{
            this.alerter.toastMessage(this.alerter.errors_msg.facebook_login_error);
          }  
      })
  }
 
}
