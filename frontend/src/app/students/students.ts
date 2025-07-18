import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit,AfterViewInit {
  public students :any;
  public dataSource:any;
  public displayedColumns=["id","firstName","lastName","payments"];
  //pour ajouter la pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
          firstName: Math.random().toString(20).substring(2,7),
          lastName: Math.random().toString(20),
          payments:[]
        }
      );
    }
    this.dataSource=new MatTableDataSource(this.students)
    //maintenant en affiche notre dataSource dans la partie html
  }

  //pour ajouter la pagination
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
  }

}
