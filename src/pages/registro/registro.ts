import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../clases/usr';
import { AngularFireAuth } from 'angularfire2/auth'

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usr : User;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private ofauth: AngularFireAuth) {

  	this.usr = new User();
  }

  async registrarse(){
   
  	try{
      const result = await this.ofauth.auth.createUserWithEmailAndPassword(this.usr.email,this.usr.clave);
      console.log("result : ",result); 
  	}catch(e){
  	  console.log("ERROR : ",e);  
  	}

  }

}
