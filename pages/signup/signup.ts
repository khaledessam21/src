import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {User} from "../../Models/User";
import {Geolocation} from "@ionic-native/geolocation";
import {AgmCoreModule} from "@agm/core";
import  {AngularFireAuth} from "angularfire2/auth";
import {Location} from "../../Models/Location";
import {Camera} from "@ionic-native/camera";
import {ToastController} from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular';
import Firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user={} as User;
  mylocation:Location=new Location(30.044420,31.235712);
  locationset=false;
  imagePath:string;
  UserList: User[];

  userRef:FirebaseListObservable<User[]>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database:AngularFireDatabase,
              private mdlCntr:ModalController,
              private geolocation:Geolocation,
              private ldgCtrl:LoadingController,
              private camera:Camera,
              private toastCtrl:ToastController,
              public alertCtrl: AlertController,
              private afAuth:AngularFireAuth,
              private toastctrl:ToastController ) {
    this.userRef=this.database.list('User');


    this.userRef.subscribe
    ((users) => {
        this.UserList=users;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  SetOnMap()
  {
    const modal=this.mdlCntr.create('MapModalPage');
    modal.present();
    modal.onDidDismiss((data)=>{
      if(data){
this.mylocation=data;
this.locationset=true;
      }
    });
  }




  GetLocation(){//const loading=this.ldgCtrl.create({
     // content:'Fetching your Location ..'
  // })
   // loading.present();

    this.geolocation.getCurrentPosition()
      .then((locationdata)=>{
      this.mylocation.Latitude=locationdata.coords.latitude;
        this.mylocation.Longitude=locationdata.coords.longitude;
        this.locationset=true;
       //for(let i=0; i<100000;i++){}
      //  loading.dismiss();
    })
      .catch((error)=>{
      console.log("Error:"+error);
    })
  }





  takePhoto(){

   this.camera.getPicture({
  destinationType:this.camera.DestinationType.DATA_URL,
  sourceType:this.camera.PictureSourceType.CAMERA,
  encodingType:this.camera.EncodingType.JPEG,
  correctOrientation:true,
  targetHeight:640,
  targetWidth:480,
  cameraDirection:this.camera.Direction.FRONT,
  quality:50,
  mediaType:this.camera.MediaType.PICTURE,
})
  .then(imagedata=>{
this.imagePath="data:image/jpeg;base64,"+imagedata;
  })
  .catch((error)=>{
   this.toastCtrl.create({
      message:'Error in capturing image: '+error,
     duration:5000
    }).present();
  })
  }




  openGallery(){


    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      targetHeight:640,
      targetWidth:480,
      cameraDirection:this.camera.Direction.FRONT,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
    })
      .then((imagedata:string)=>{
        //const portions:string[]=imagedata.split('?');
        //this.imagePath=portions[0];
        this.imagePath="data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in getting image: '+error,
          duration:5000
        }).present();
      })




  }
  /*click(event){
    this.mylocation.Latitude=event.coords.lat;
    this.mylocation.Longitude=event.coords.lng;
    this.locationset=true;
  }*/

  Register(unique:number=0)
  { this.user.Address = this.mylocation;

    if(this.user.Name==""|| this.user.Username==""||this.user.image==""||this.user.Address==null||this.user.age==null||this.user.Password=="")
    {
      const alert = this.alertCtrl.create({
        title: 'Social App!',
        subTitle: 'you must fill all fields!',
        buttons: ['OK']
      });
      alert.present();
      unique=1;
    }

    for (let x of this.UserList )
    {
      if(x.Username==this.user.Username)
      {
        const alert = this.alertCtrl.create({
          title: 'Social App!',
          subTitle: 'this username has already taken!',
          buttons: ['OK']
        });
        alert.present();
        unique=1;
      }}



    if(unique==0) {


      /*auth*/

        const result =this.afAuth.auth
          .createUserWithEmailAndPassword(this.user.Username,this.user.Password).then(data => {
            const alert = this.alertCtrl.create({
              title: 'Social App!',
              subTitle: 'you have been registered successfully!',
              buttons: ['OK']
            });
            alert.present();
           // this.imagePath = "xxxxxxx";
           // this.user.image = this.imagePath;


         /*   const ImageRef=Firebase.storage().ref("Images/image-"+new Date().getMilliseconds() +".jpg");
            ImageRef.putString(this.imagePath,Firebase.storage.StringFormat.DATA_URL)
              .then((snapshot)=>
              {
                this.user.image=snapshot.downloadURL;


                /*here the 3 push statemnts*/



          /*
              })
              .catch(error=>
              {
                this.toastctrl.create(
                  {
                    message:'Error in getting image'+error,
                    duration:5000
                  }
                ).present();
              })
            ;*/


            this.userRef.push(this.user);
            this.user = {} as User;
            this.navCtrl.pop();


          })
          .catch(error =>{
            const alert = this.alertCtrl.create({
              title: 'Social App!',
              subTitle: 'invalid email!',
              buttons: ['OK']
            });
            alert.present();})


      /*end auth*/
      //this.user.Address.Longitude=this.mylocation.Longitude;

      /* this.mypost.Name="fgvdfg";
       this.mypost.desc="dfvdf";
       this.PostsRef.push(this.mypost);
       this.myproduct={} as Product;
       this.navCtrl.pop();*/
    }
  }
}
/*



  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private database:AngularFireDatabase
  )
  {
    this.ProductsRef=this.database.list('Products');

    this.PostsRef=this.database.list('Posts');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  AddItem()
  {
    this.ProductsRef.push(this.myproduct);
    this.mypost.Name="fgvdfg";
    this.mypost.desc="dfvdf";
    this.PostsRef.push(this.mypost);
    this.myproduct={} as Product;
    this.navCtrl.pop();

  }

}
* */
