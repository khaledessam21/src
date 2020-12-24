import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {User} from "../../Models/User";
import  {AngularFireAuth} from "angularfire2/auth";
import {FormBuilder,FormGroup,Validators,AbstractControl} from "@angular/forms";
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  //  password: AbstractControl;
  userRef: FirebaseListObservable<User[]>;
  UserList: User[];
  formgroup:FormGroup;
   user={} as  User;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              public formbuilder:FormBuilder,
              private afAuth:AngularFireAuth,
              public alertCtrl: AlertController
            ) {
    this.userRef = this.database.list('User');
    this.formgroup=formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });

   // this.username=this.formgroup.controls['username'],
    //this.password=this.formgroup.controls['password'];

    this.userRef.subscribe
    ((users) => {
    this.UserList=users;
      }
    )


  }
  emptyerror:string;
  Not_exist:string;



  CheckEmpty()
  {
    if(this.username==null && this.password==null)
    {

      this.emptyerror="you should enter all data";
      return 1;
    }
    if(this.username==null  &&this.password!=null ){
      this.emptyerror="you should enter your username";
      return 1;
    }
    if(this.password==null &&this.username!=null){
      this.emptyerror="you should enter your password";
      return 1;
    }
  }
  async loginclicked() {


    if(this.username==null||this.password==null)
    {
      const alert = this.alertCtrl.create({
        title: 'Social App!',
        subTitle: 'you must fill all the fields',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password)
        .then(data => {
          const alert = this.alertCtrl.create({
            title: 'Social App!',
            subTitle: 'login successfully!',
            buttons: ['OK']
          });
          alert.present();

          for(let x of this.UserList)
          {
            if(this.username==x.Username)
            {
               this.user=x;
              console.log("login "+this.user);
            }
          }

          this.navCtrl.push(
            'SearchPage',{user:this.user,currentUserId:this.user.$key});
        })
        .catch(error => {
          const alert = this.alertCtrl.create({
            title: 'Social App!',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
        })
    }
}
/*for (let user of this.UserList)
{

  if(user.Username==this.username && user.Password==this.password)
  {
    this.navCtrl.push('HomePage');
  }
  else
  {
    this.Not_exist="not exists";
  }

}*/





  signupClicked()
  {
    this.navCtrl.push('SignupPage');
  }
}
/*HAXM installation failed. To install HAXM follow the instructions
found at: https://software.intel.com/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows

C:\Users\Khaled Essam\AppData\Local\Android*/
