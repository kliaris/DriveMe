import { Component, OnInit } from '@angular/core';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.page.html',
  styleUrls: ['./fb-login.page.scss'],
})
export class FbLoginPage implements OnInit {
   
  constructor(private fbLogin:FbLoginService,private navCtrl:NavController) { }

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
          }
          
        
      })
  }
  async Logout(){
    await this.fbLogin.fbLogOut();
  } 
}
