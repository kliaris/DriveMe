# DriveMe
Ionic v4 app

ionic cordova plugin add cordova-plugin-nativestorage
npm install @ionic-native/native-storage

https://developers.facebook.com/apps
DriveMe 
APP ID: 404327050403826
at app setting add platform for both ios and android to set bundle id
bundle id:com.DriveMe

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
