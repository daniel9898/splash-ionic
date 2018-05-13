import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../clases/usr';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  usr : any;
  votaciones : any;
  users : any;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public utils :UtilitiesProvider,
              public firebaseService: FirebaseDbProvider,
              private storage: Storage) {

    this.subscribirDatos();
  }
  
  async subscribirDatos(){

    this.users = await this.firebaseService.operationDB("getAll","usuarios")
    this.users.subscribe(usuarios =>{

          console.log("USUARIOS : ",usuarios);
          this.storage.set('usuarios',usuarios);
    })

    this.votaciones = await this.firebaseService.operationDB("getAll","votacion");
    this.votaciones.subscribe(votos =>{

          console.log("VOTACIONES : ",votos);
          this.storage.set('votos',votos);
    })

  }
 
  async emitirVotacion(eleccion : string){

    this.utils.showLoading(true);

    try{  
          this.usr = await this.storage.get('usr');
         
          let permitir = await this.verificarVoto();
          console.log("permitir : ",permitir);

          if(permitir){
              await this.firebaseService.operationDB("insert", "votacion", this.usr.uid, {eleccion : eleccion, uid: this.usr.uid})
              this.utils.showToast("USTED A VOTADO CON EXITO !!");
              this.navCtrl.push("ListaPage");
          }

    }catch(e){
      this.utils.dismissLoading();
      this.utils.showAlert("Error al emitir el voto",e.message);
    }


  }


  async verificarVoto(){ 
    
    try{
          let votacionCerrada = false;
          let yaVoto = false;
          
          this.users = await this.storage.get('usuarios');
          this.votaciones = await this.storage.get('votos');

          let cantidadUsr = this.users.length;
          let cantidadVotos = this.votaciones.length;
          

          votacionCerrada = (cantidadUsr == cantidadVotos);

          this.votaciones.forEach(votoUsr => {

            if(!yaVoto && votoUsr.uid == this.usr.uid) yaVoto = true;

          })
    
          if(votacionCerrada || yaVoto){

             this.utils.dismissLoading();
             this.utils.showAlert("Informe :",votacionCerrada ? "Lo sentimos la Votacion a Finalizado" : "Usted ya voto Anteriormente");
             this.navCtrl.push("ListaPage");

          }
         
          return (!votacionCerrada && !yaVoto);

    }catch(e){
      this.utils.dismissLoading();
      this.utils.showAlert("Informe :",e.message);
    }

  }
}
