import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../clases/usr';
import { AngularFireAuth } from 'angularfire2/auth'
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usr : User;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private ofauth: AngularFireAuth,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

  	this.usr = new User();
  }

  presentAlert(msj : string) {
    let alert = this.alertCtrl.create({
      title: 'Informe de Ingreso : ',
      subTitle: msj,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast() {

    let toast = this.toastCtrl.create({
      message: 'Usted se registro exitosamente !!',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
}

  async registrarse(){
   
  	try{
      const result = await this.ofauth.auth.createUserWithEmailAndPassword(this.usr.email,this.usr.clave);
      console.log("result : ",result);
      this.presentToast();
      //redirect 
  	}catch(e){
  	  console.log("ERROR : ",e); 
      this.presentAlert(e.message); 
  	}

  }

}
