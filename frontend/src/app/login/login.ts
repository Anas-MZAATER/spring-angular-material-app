import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Authentification} from "../services/authentification";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  public loginFormGroup! :FormGroup;

  constructor(private fb:FormBuilder,
              private authService : Authentification,
              private router : Router) {
  }
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
      this.loginFormGroup=this.fb.group({
        //initialiser le champ username par un chain vide
        username:this.fb.control(''),
        password:this.fb.control('')
      });
    }

  login() {
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    //verifier loginFormGroup content
    // console.log(username,":",password);
    let auth: boolean = this.authService.login(username, password);
    if(auth){
      this.router.navigateByUrl("/template/home")
    }
  }
}
