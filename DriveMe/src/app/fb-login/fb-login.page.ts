import { Component, OnInit } from '@angular/core';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.page.html',
  styleUrls: ['./fb-login.page.scss'],
})
export class FbLoginPage implements OnInit {
 userData=null;
  constructor(private facebook:Facebook) { }

  ngOnInit() {
  }

  fbLogin(){
    this.facebook.login(['email','public_profile']).then((response:FacebookLoginResponse)=>{
              this.facebook.api('me?fields=id,name,email,first_name,last_name',[]).then((profile)=>{
                    this.userData={email:profile.email,first_name:profile.first_name,last_name:profile.last_name};
              }) 
    })
  }
}
