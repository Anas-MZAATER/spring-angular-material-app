import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {Payment} from "../model/students.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.html',
  styleUrl: './student-details.css'
})
export class StudentDetails implements OnInit{
  studentCode! : string;
  studentsPayments! : Array<Payment>;
  // initialiser la dataSource de table
  paymentsDataSource! : MatTableDataSource<Payment>
  //liste des colonnes qu'on va afficher
  public displayedColumns =['id','date','amount','type','status','firstName','details'];

  //pour ajouter la pagination
  // la "!" pour ne pas l'initialiser
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pour le tri
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private activatedRoute : ActivatedRoute,
              private studentsService:StudentsService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.studentsService.getStudentPayments(this.studentCode).subscribe({
      next:data => {
        // si data arrive je les stock dans mon liste puis dans table datasource
        this.studentsPayments =data;
        this.paymentsDataSource= new MatTableDataSource<Payment>(this.studentsPayments);
        this.paymentsDataSource.paginator = this.paginator;
        this.paymentsDataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    });
  }


  newPayment() {
    this.router.navigateByUrl(`template/newPayment/${this.studentCode}`)
  }

  paymentDetails(element:Payment) {
    this.router.navigateByUrl(`template/paymentDetails/${element.id}`)
  }
}