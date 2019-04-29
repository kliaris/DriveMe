import { Injectable } from '@angular/core';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AlerterService {
  errors_msg:any;

  constructor(private platform:Platform,private translate:TranslateService, public toastController: ToastController,public alertCtrl:AlertController) { 
    this.platform.ready().then(async()=>{   // Now safe to use  
                                            // Get the errors messages from assets/i18n/language.json file
      this.translate.get('errors_msg').subscribe((res) => {  
           this.errors_msg=res;
      });
      
    })     

  }
  //============================================================================================================//
  //=================================  Presents messages with toasts    ========================================//
  //============================================================================================================//
  async toastMessage(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  //============================================================================================================//
  //====================================   alert user to unsure   ==============================================//
  //============================================================================================================//
  async presentAlertConfirm(msg:string) {
        let promise= new Promise(async (resolve)=>{
                const alert = await this.alertCtrl.create({
                  message: msg,
                  cssClass: 'alerterCustom',
                  buttons: [
                    {
                      text: this.errors_msg.cancel,
                      role: 'cancel',
                      
                      handler: () => {
                        console.log(msg + ': Cancelled');
                        resolve("YES");
                      }
                    }, {
                      text: this.errors_msg.yes,
                      handler: () => {
                        console.log(msg + ': Yes');
                        resolve("YES");
                      }
                    }
                  ]
                });
                await alert.present();
        })
        return promise;
  }
  
}
