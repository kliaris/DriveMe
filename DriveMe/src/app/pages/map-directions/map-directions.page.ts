import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location/location.service';
import { AlerterService } from 'src/app/services/alerter/alerter.service';
import { FbLoginService } from 'src/app/services/fb-login/fb-login.service';
import { ConnectivityService } from 'src/app/services/connectivity/connectivity.service';
declare var google;


@Component({
  selector: 'app-map-directions',
  templateUrl: './map-directions.page.html',
  styleUrls: ['./map-directions.page.scss','../../css/toolbar.scss','../../css/buttonsArea.scss','../../css/labels.scss'],
})
export class MapDirectionsPage implements OnInit {
 
  @ViewChild('Map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
   
    distance:any;
    duration:any;

    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    
    viewport:any;               //if viewport is myLocation,then the map is showing my location, else is showing polyline of points 
    map_direction_page_words:any
    loadingC:any;
  constructor(private location:LocationService,private platform:Platform,public zone: NgZone,private fbLogin:FbLoginService,public loadingController: LoadingController,
              private translate:TranslateService,private alerter:AlerterService,private navCtrl:NavController,private connectivity:ConnectivityService) {    
    this.platform.ready().then(async()=>{ // Now safe to use
                                          // Get the messages and the words for this page from assets/i18n/language.json file
        this.translate.get('map_direction_page').subscribe((res) => {
            this.map_direction_page_words=res;
        });

        
    })
    if(this.connectivity.isOnline()){    //check for network
      this.getTheDirections(this.location.departure.input,this.location.destination.input);
    }else{
      this.alerter.toastMessage(this.alerter.errors_msg.network_error);
    }
     
    
  }

  async ngOnInit() {
  }
  //============================================================================================================//
  //=============================   display mapview of polyline of two points ==================================//
  //============================================================================================================//
  async getTheDirections(departure:any,destination:any){
    if(this.connectivity.isOnline()){    //check for network

      const loadingC = await this.loadingController.create({
        spinner:'crescent',
        message: 'Please wait...',
        translucent: true
        // cssClass: ''
      });
      await loadingC.present();
      this.viewport="polyline";
  
        /*Map options*/
      this.mapOptions = {
        // center: this.googleMaps.myLocation,
        zoom: 18,
        mapTypeControl: false
    };
    await setTimeout(async () => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
  
          let directionsService = new google.maps.DirectionsService;
          let directionsDisplay = new google.maps.DirectionsRenderer;
          let matrix = new google.maps.DistanceMatrixService();
  
          directionsDisplay.setMap(this.map);
     
          await directionsService.route({
              origin: departure,
              destination: destination,
              travelMode: google.maps.TravelMode['DRIVING']
          }, (res, status) => {      
                                            // if directions found then call for distance matrix
              if(status == google.maps.DirectionsStatus.OK){
                  directionsDisplay.setDirections(res);    
                  matrix.getDistanceMatrix(
                    {
                      origins: [departure],
                      destinations: [destination],
                      travelMode: 'DRIVING',     
                    },  (res, status) => {
          
                      if (status == google.maps.DistanceMatrixStatus.OK) {
                        this.distance=res.rows[0].elements[0].distance.text;
                        this.duration=res.rows[0].elements[0].duration.text;
                        console.log(res);
                      }else{
                        console.log(status);
                      }
                  });
              } else {
                this.getMyLocation();
                this.alerter.toastMessage(this.alerter.errors_msg.direction_not_found);
                console.log(status);
              }
          });
          await loadingC.dismiss();
    }, 3000);
    
    }else{
      this.alerter.toastMessage(this.alerter.errors_msg.network_error);
    }
  }
  //============================================================================================================//
  //=============================   display mapview of user's current position =================================//
  //============================================================================================================//
  async getMyLocation(){
    if(this.connectivity.isOnline()){    //check for network
    
      const loadingC = await this.loadingController.create({
        spinner:'crescent',
        message: 'Please wait...',
        translucent: true
        // cssClass: ''
      });
      await loadingC.present();
      this.viewport="myLocation";
  
      await this.location.getCurrentPosition();
      /*Map options*/
      this.mapOptions = {
          center: this.location.myLocation,
          zoom: 17,
          mapTypeControl: false
      };
      await setTimeout(async () => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
          /*Marker Options*/
          this.markerOptions.position = this.location.myLocation;
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);
          await loadingC.dismiss();
      }, 3000);
    }else{
      this.alerter.toastMessage(this.alerter.errors_msg.network_error);
    }
    
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
                    this.navCtrl.navigateBack('/login');
                  }else{
                    this.alerter.toastMessage(this.alerter.errors_msg.facebook_logout_error);
                  }
              })
            }
      })
  } 

  goBack(){
    this.navCtrl.navigateBack('/home');
  }

}
