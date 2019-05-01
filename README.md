# DriveMe
# Introduction
In this repo i'm going to cover how to implement some of Google Maps functions inside an Ionic v4 app, using Places and Directions Google's Maps API.
## Basic operation of DriveMe is:
* The user should log in in the app using his/her Facebook credentials
* The user give two geolocation places int two autocomplete fields which will take the values from
google places.
* The app display their path on the map, the estimated time and the distance via google’s directions API.
* The app display the current position of the user.

Before we start developing the app, it's a good idea to think the app should be fully operational.For this reason,in the designing of the application,we have to think that the app must inform the user about the absense of network, for verifications about desicions like the logout or any failure of system.Ιn addition, as every modern application should have multilingual infrastructure.For the above functions we will use 
* AlertController
* ToastController
* Network plugin (https://ionicframework.com/docs/native/network )
* i18n for multilingual ( https://github.com/ngx-translate/core )




ionic cordova plugin add cordova-plugin-nativestorage
npm install @ionic-native/native-storage

https://developers.facebook.com/apps
DriveMe 
APP ID: 404327050403826
at app setting add platform for both ios and android to set bundle id
bundle id:com.DriveMe

Enable Google Maps Platform
AIzaSyCWge2f_U45b8smjo65isswwyvbs7UeBCY

npm install --save @ionic-native/facebook
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="404327050403826" --variable APP_NAME="DriveMe"

go to config.xml and set the widget id to bundle id ,
and set the app name to DriveMe.

ngx-translate multilingual
npm install @ngx-translate/core --save

By default, there is no loader available. You can add translations manually using setTranslation but it is better to use a loader. You can write your own loader, or import an existing one. For example you can use the TranslateHttpLoader that will load translations from files using HttpClient.

To use it, you need to install the http-loader package from @ngx-translate:

npm install @ngx-translate/http-loader --save

If you want to configure a custom TranslateLoader while using AoT compilation or Ionic, you must use an exported function instead of an inline function.



-------------------------
First of all, you need to generate API keys for Google Maps APIs.

How to generate API keys?
Second, run following command to install @ionic-native/core and @ionic-native/google-maps plugins in your project.

npm install @ionic-native/core@beta @ionic-native/google-maps@beta

ionic cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps#multiple_maps
npm install @types/google-maps --save
