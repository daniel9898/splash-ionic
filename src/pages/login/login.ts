import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../clases/usr';
import { AngularFireAuth } from 'angularfire2/auth'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usr : User;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private ofauth: AngularFireAuth) {

  	this.usr = new User();
  }

  
  async login(){
    
    try{
    	const result = await this.ofauth.auth.signInWithEmailAndPassword(this.usr.email,this.usr.clave);
    	console.log("result : ",result); 
    	//SI RESULT ES VERDADERO NAVEGAMOS A LA HOME PAGE
    }catch(e){
       console.log("ERROR : ",e);
    }
    
  }

  paginaRegistro(){
  	this.navCtrl.push('RegistroPage');
  }

}
