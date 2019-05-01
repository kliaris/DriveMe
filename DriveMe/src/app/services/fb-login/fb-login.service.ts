import { Injectable } from '@angular/core';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { resolve } from 'q';
import { AlerterService } from '../alerter/alerter.service';

@Injectable({
  providedIn: 'root'
})
export class FbLoginService {

  userData:any=null;
  isUserloggedIn:boolean=false;

  constructor(private platform:Platform, private fb:Facebook,private nativeStorage: NativeStorage,private alerter:AlerterService) {
     this.platform.ready().then(async()=>{  // Now safe to use
            // await this.removeUser();
                    
            // this.userData= await this.getUser().catch(()=>console.log("No user is Stored"));
      })                    
   }
  
  //============================================================================================================//
  //=========================   Manage the LOGIN procedure with Facebook credentials   =========================//
  //============================================================================================================//
  async fbLogIn(){
       let promise= new Promise(async (resolve)=>{
        await this.fb.login(['email','public_profile']).then(async (response:FacebookLoginResponse)=>{
                  await this.fb.api('me?fields=id,name,email,first_name,last_name',[]).then(async (profile)=>{
                        this.userData={email:profile['email'],first_name:profile['first_name'],last_name:profile['last_name']};
                        this.isUserloggedIn=true;
                        await this.saveUser();
                        //  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART); 
                         console.log("apo service"); 
                          resolve("LoggedIn");
                  })  
          })
          .catch(e =>this.alerter.toastMessage(this.alerter.errors_msg.facebook_login_error));         
   
      })
    
      return promise;   
  }

  //============================================================================================================//
  //=========================   Manage the LOGOUT procedure with Facebook credentials   =========================//
  //============================================================================================================//
  async fbLogOut(){
    let promise= new Promise(async (resolve)=>{
          await this.fb.logout().then(async(response)=>{
            console.log(response);
            await this.removeUser();
            // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
            this.isUserloggedIn=false;
            this.userData=null;
            resolve("LoggedOut");
          })
          .catch(e =>this.alerter.toastMessage(this.alerter.errors_msg.facebook_logout_error));
    })
    return promise;
  }

  //============================================================================================================//
  //=============================   Save the user's credentials at native storage  =============================//
  //============================================================================================================//
  async saveUser(){
    this.nativeStorage.setItem('activeUser', {userData: this.userData})
    .then(
      () => console.log('Stored User!'),
      error =>this.alerter.toastMessage(this.alerter.errors_msg.save_user_error)
    );
  }


  //============================================================================================================//
  //========================   Get the user's Facebook credentials from native storage  ========================//
  //============================================================================================================//
  async getUser(){
    await this.nativeStorage.getItem('activeUser')
    .then(
      data =>{ 
        if(data.userData){
          console.log(data);
          return data.userData
        }
      },error => this.alerter.toastMessage(this.alerter.errors_msg.retrieve_user_error)
    );
  }
  //============================================================================================================//
  //========================   Remove the user's Facebook credentials from native storage  =====================//
  //============================================================================================================//
  async removeUser(){
    await this.nativeStorage.remove('activeUser')
    .then(
      data =>{ console.log("User Removed")},
      error =>this.alerter.toastMessage(this.alerter.errors_msg.retrieve_user_error)
    );
  }
}
