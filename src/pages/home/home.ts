import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //usr : User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //tomo los parametros y hago el objeto
  	//this.usr = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  matafuego(){

  }

  plantas(){

  }

}
