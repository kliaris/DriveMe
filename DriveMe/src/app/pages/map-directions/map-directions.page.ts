import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsService } from 'src/app/services/googleMaps/google-maps.service';
declare var google;
@Component({
  selector: 'app-map-directions',
  templateUrl: './map-directions.page.html',
  styleUrls: ['./map-directions.page.scss'],
})
export class MapDirectionsPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  constructor(private googleMaps:GoogleMapsService) { 
      this.googleMaps.getCurrentPosition();   
  }

  ngOnInit() {
  }


  ionViewDidLoad(){

    this.loadMap();
    // this.startNavigating();

  }

    loadMap(){
    
        let latLng = new google.maps.LatLng( 39.3299571, 22.0958712);
    
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    }

    startNavigating(){

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);
      

      directionsService.route({
          origin: 'adelaide',
          destination: 'adelaide oval',
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {

          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }

      });

    }

}
