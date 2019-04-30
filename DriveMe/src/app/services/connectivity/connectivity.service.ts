import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(public network: Network) { }

  isOnline(): boolean {
    if( this.network.type){
      return this.network.type != 'none';
    } 
  }

  isOffline(): boolean {
    if(this.network.type){
      return this.network.type == 'none';
    }
  }
}
