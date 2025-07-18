import {Component, OnInit} from '@angular/core';
import {Authentification} from "../services/authentification";

@Component({
  selector: 'app-template',
  standalone: false,
  templateUrl: './template.html',
  styleUrl: './template.css'
})
export class Template implements OnInit{

  constructor(public authService : Authentification) {
  }
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

}
