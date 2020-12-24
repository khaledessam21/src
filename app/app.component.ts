import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    firebase.initializeApp({
      apiKey: "AIzaSyDd4xtWtUIiyO9ZDjXfW9CtN2gKKAy67OU",
      authDomain: "socialapp-93b5d.firebaseapp.com",
      databaseURL: "https://socialapp-93b5d.firebaseio.com",
      projectId: "socialapp-93b5d",
      storageBucket: "socialapp-93b5d.appspot.com",
      messagingSenderId: "48843770108"
    })



  }
}

