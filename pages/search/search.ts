import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Models/User';
import { AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  UserRef:FirebaseListObservable<User[]>;
  UserList:User[]=[];
  List:User[]=[];
  names:string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database:AngularFireDatabase) {
    this.UserRef=this.database.list('User');
    this.UserRef.subscribe
            (
              (data)=>
              {
               
               this.UserList=data;
                   
     }
            );

    for(let x of this.UserList)
    {
      console.log(x.Name);

    }
    }
    
    getItems(ev) {
      // Reset items back to all of the items
       this.List=this.UserList;
      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.List = this.List.filter((item)=> {
        //  item.Name="mahmoud";

          console.log('iam '+item.Name);
          return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

  visit(user)
  {
  // this.navCtrl.push('ProfilePage',{user:user , currentUserId:this.currentUser.$key});
   console.log(user);
  }
  
}
