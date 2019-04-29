import { Component, OnInit } from '@angular/core';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { AlerterService } from 'src/app/services/alerter/alerter.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private fbLogin:FbLoginService,private alerter:AlerterService,private navCtrl:NavController) { }

  ngOnInit() {
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
