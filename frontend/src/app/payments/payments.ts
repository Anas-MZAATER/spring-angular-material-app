import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {environment} from "../../environments/environment";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.html',
  styleUrl: './payments.css'
})
export class Payments implements OnInit{
  // initialiser une liste de type any
  public payments : any;
  // initialiser la dataSource de table
  public dataSource:any;
  //liste des colonnes qu'on va afficher
  public displayedColumns =['id','date','amount','type','status','firstName'];

  //pour ajouter la pagination
  // la "!" pour ne pas l'initialiser
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pour le tri
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private studentsService : StudentsService) {
  }

  ngOnInit(): void {
    this.studentsService.getAllPayments()
        .subscribe({
          next:data => {
            // si data arrive je les stock dans mon liste puis dans table datasource
            this.payments=data;
            this.dataSource= new MatTableDataSource(this.payments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error : err => {
            console.log(err);
          }
        })
  }
}
