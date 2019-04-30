import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  // mapElement: any;
  // pleaseConnect: any;
  // map: any;
  // mapInitialised: boolean = false;
  // mapLoaded: any;
  // mapLoadedObserver: any;
  // currentMarker: any;
  // apiKey: string = "AIzaSyCWge2f_U45b8smjo65isswwyvbs7UeBCY";

  GoogleAutocomplete:any;
  departure:any;
  destination:any;
  autocompleteDeparture:any;
  autocompleteDestination:any;

  constructor(private platform:Platform,private zone: NgZone,private geolocation: Geolocation) {
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

    this.geolocation.getCurrentPosition(options).then((resp) => {
     console.log(resp);
      
    }).catch((error) => {
      console.log('Error getting location', error);
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
        }catch{console.log("input warning in getplacePredictions()")}
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
        }catch{console.log("input warning in getplacePredictions()")}
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
