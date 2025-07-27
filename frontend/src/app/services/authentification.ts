import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Authentification {
  public username:any;
  public roles : any;
  public authenticated : boolean = false;
  public users:any={
    'admin':['STUDENT','ADMIN'],
    'user1':['STUDENT']
  }

  constructor(private router:Router) { }


  public login(username:any , password:String){
    if(this.users[username] && password=="1234"){
      this.username = username;
      this.roles = this.users[username];
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
