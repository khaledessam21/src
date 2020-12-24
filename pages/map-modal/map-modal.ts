import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams,ViewController} from 'ionic-angular';
import {User} from "../../Models/User";
import {Location} from "../../Models/Location";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Generated class for the MapModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {

  mylocation:Location=new Location(30.044420,31.235712);
  locationset=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database:AngularFireDatabase,
              private mdlCntr:ModalController,
              private  viewCtrl:ViewController) {
    //this.userRef=this.database.list('User');
  }

  click(event){
    this.mylocation.Latitude=event.coords.lat;
    this.mylocation.Longitude=event.coords.lng;
    this.locationset=true;
  }



  setLocation()
  {
    this.viewCtrl.dismiss(this.mylocation);
  }

  Cancel()
  {
    this.viewCtrl.dismiss();
  }


}
