import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../clases/usr';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  
  users : any;
  votaciones : any;
  title : string;
  cantPlantas : number = 0;
  cantMataf : number = 0;
  totalVotos : number = 0;
  ganador : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebaseService: FirebaseDbProvider,
              public utils :UtilitiesProvider,
              private storage: Storage) {
    
  	this.actualizarDatos();
  }

  async actualizarDatos(){

    try{
          this.users = await this.storage.get('usuarios');
          this.votaciones = await this.storage.get('votos');
          
          this.totalVotos = this.votaciones.length;
          this.title = (this.users.length == this.votaciones.length) ? 'Resultado Final' : 'Resultados Parciales';
          this.calcularVotos();

    }catch(e){
         
          this.utils.showAlert("Informe :",e.message);
    }
  }

  calcularVotos(){
    
    this.votaciones.forEach(usrVoto => {

    		usrVoto.eleccion == 'plantas' ?  this.cantPlantas++ : this.cantMataf++;
    })
    
    if(this.title == 'Resultado Final')
       this.ganador = this.cantMataf > this.cantPlantas ? "Matafuegos" : "Plantas"; 
  }

 

}
