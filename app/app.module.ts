import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireModule} from "angularfire2";
import  {Geolocation} from '@ionic-native/geolocation'


import  {Camera} from '@ionic-native/camera';
import  {AngularFireAuth} from "angularfire2/auth";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyDd4xtWtUIiyO9ZDjXfW9CtN2gKKAy67OU",
        authDomain: "socialapp-93b5d.firebaseapp.com",
        databaseURL: "https://socialapp-93b5d.firebaseio.com",
        projectId: "socialapp-93b5d",
        storageBucket: "socialapp-93b5d.appspot.com",
        messagingSenderId: "48843770108"
      }
    ),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    AngularFireAuth,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
