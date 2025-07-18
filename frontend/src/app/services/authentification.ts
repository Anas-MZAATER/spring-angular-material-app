import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class Authentification {
  public username! : String;
  public roles : any;
  constructor() { }


  public login(username:String , password:String){
    if(username=="admin" && password=="1234"){
      this.username = username;
      this.roles = ['ADMIN'];
      return true;
    } else {
      return false;
    }
  }














}
