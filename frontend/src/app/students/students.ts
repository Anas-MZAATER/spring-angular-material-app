import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
  public students :any;
  public dataSource:any;
  public displayedColumns=["id","firstName","lastName","payments"];
  constructor() {
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // initialisation static des étudiants
    this.students=[];
    for(let i=4;i<40;i++){
      this.students.push(
        {
          id : i,
          firstName: Math.random().toString(20),
          lastName: Math.random().toString(20)
        }
      );
    }
    this.dataSource=new MatTableDataSource(this.students)
    //maintenant en affiche notre dataSource dans la partie html
  }

}
