//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../clases/usr';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseDbProvider {
  
  //collection: AngularFirestoreCollection<any>;
  
  constructor(private ofauth: AngularFireAuth,
  	          private db: AngularFirestore) {
    
  }

  async authentication(user: User){
    return this.ofauth.auth.createUserWithEmailAndPassword(user.email, user.clave);
  }

  /*
  // CUANDO QUEREMOS GENERAR UN ID AUTOMATICO
  db.collection("cities").add({
      name: "Tokyo",
      country: "Japan"
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
      */
  

  async operationDB(operationName : string, collectionName: string, id?: string,  data?: any){
    const docRef = (operationName == "getAll") ? this.db.collection(collectionName) : 
                                                 this.db.collection(collectionName).doc(id);
    switch (operationName) {
      case "getAll":
        return docRef.ref.get();
      case "get":
        return docRef.ref.get();
      case "insert":
        return docRef.ref.set(data); //se podria verificar si es insert y id no esta definido generar id automatico
      case "delete":
        return docRef.ref.delete();
      case "update":
        return docRef.ref.update(data);
      default:
        return "Operacion No valida";
    }
  }



}
