export class User {

  public nombre : string;
  public clave : string;
  public email : string;
  public uid : string;

  constructor() {}

  formatUser(usr: User ,data : any) : any{
  	delete usr.clave;
    return {uid:data.uid, nombre:usr.nombre, email:data.email};
  }


}