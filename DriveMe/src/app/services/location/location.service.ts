import { Injectable, NgZone } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlerterService } from '../alerter/alerter.service';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 
  GoogleAutocomplete:any;
  departure:any;
  destination:any;
  autocompleteDeparture:any;
  autocompleteDestination:any;


  myLocation = {lat: null, lng: null};

  constructor(private platform:Platform,private zone: NgZone,private geolocation: Geolocation,private alerter:AlerterService) {
        this.platform.ready().then(async()=>{ // Now safe to use
              this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
              this.departure = { input: '' };
              this.destination = { input: '' };
              this.autocompleteDeparture = [];
              this.autocompleteDestination = [];  
        })    
   }
  

  //============================================================================================================//
  //================================   Get my Current position via Geolocation =================================//
  //============================================================================================================//
  getCurrentPosition(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
     /*Get Current location*/
    this.geolocation.getCurrentPosition(options).then((position) =>  {
        this.myLocation.lat = position.coords.latitude;
        this.myLocation.lng = position.coords.longitude;
    }).catch((error) => {
      this.alerter.toastMessage(this.alerter.errors_msg.current_position_error)
    });

  }

  //============================================================================================================//
  //================   on Input change of searchbars updateSearchDepartureResults and ==========================//
  //=============   updateSearchDestinationResults is running to get the google's predictions ==================//
  //============================================================================================================//
   updateSearchDepartureResults(){
    if (this.departure.input == '') { 
      this.autocompleteDeparture = [];
      return;
    }    
    this.GoogleAutocomplete.getPlacePredictions({ input: this.departure.input },
    (predictions) => {
      this.autocompleteDeparture = [];
      this.zone.run(() => {
        try{
            predictions.forEach((prediction) => {
              this.autocompleteDeparture.push(prediction);
            });
        }catch{this.alerter.toastMessage(this.alerter.errors_msg.update_predictions_error)}
      });
    });
  }
  updateSearchDestinationResults(){
    if (this.destination.input == '') {
      this.autocompleteDestination = [];
      return;
    }
    
    this.GoogleAutocomplete.getPlacePredictions({ input: this.destination.input },
    (predictions) => {
      this.autocompleteDestination = [];
      this.zone.run(() => {
        try{
          predictions.forEach((prediction) => {
            this.autocompleteDestination.push(prediction);
          });
        }catch{this.alerter.toastMessage(this.alerter.errors_msg.update_predictions_error)}
      });
    });
  }
  //============================================================================================================//
  //=====================   on place select, set the name of place at the searchbar ============================//
  //============================================================================================================//
  selectSearchDepartureResult(item){
    console.log(item);
      this.departure.input=item.description;
      this.autocompleteDeparture = [];
  }
  selectSearchDestinationResult(item){
    console.log(item);
      this.destination.input=item.description;
      this.autocompleteDestination = [];
  }
  //============================================================================================================//
  //===================   onClear of searchbar,clear the list of google's predictions  =========================//
  //============================================================================================================//
  clearDepartureList(event:any){
    console.log(event);
    this.autocompleteDeparture=[];
  }
  
  clearDestinationList(){
    this.autocompleteDestination=[];
  }
  
}
