import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlerterService } from '../alerter/alerter.service';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(public network: Network,public alerter:AlerterService) { }
   //===========================================================================================================//
  //=====================================  check for network  ==================================================//
  //============================================================================================================//
  isOnline(): boolean {
    console.log(this.network.type);
    if( this.network.type !='none'){
      return true;
    }else{        
      return false;
    } 
  }

  
}
