import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})


export class Authentification {
  public username:any;
  public roles : any;
  public authenticated : boolean = false;
  constructor(private router:Router) { }


  public login(username:String , password:String){
    if(username=="admin" && password=="1234"){
      this.username = username;
      this.roles = ['ADMIN'];
      this.authenticated=true;
      return true;
    } else {
      return false;
    }
  }


  logout() {
    this.authenticated=false;
    this.roles= undefined;
    this.roles=undefined;
    this.router.navigateByUrl("/login")
  }
}
