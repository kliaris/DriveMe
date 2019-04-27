# DriveMe
Ionic v4 app


https://developers.facebook.com/apps
DriveMe 
APP ID: 404327050403826
at app setting add platform for both ios and android to set bundle id
bundle id:com.DriveMe

npm install --save @ionic-native/facebook
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="404327050403826" --variable APP_NAME="DriveMe"

go to config.xml and set the widget id to bundle id ,
and set the app name to DriveMe.
