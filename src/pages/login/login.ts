import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,
         AlertController, LoadingController } from 'ionic-angular';

import { User } from '../../clases/usr';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usr : User;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private ofauth: AngularFireAuth,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

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
      message: 'Ingreso Exitoso !!',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  
  async login(){

    this.presentLoadingDefault();
    
    try{
    	const result = await this.ofauth.auth.signInWithEmailAndPassword(this.usr.email,this.usr.clave);
    	console.log("result : ",result);
      this.presentToast(); 
      this.navCtrl.push('');
    }catch(e){
       this.presentAlert(e.message); 
       console.log("ERROR : ",e);
    }
    
  }

  paginaRegistro(){
  	this.navCtrl.push('RegistroPage');
  }

}
