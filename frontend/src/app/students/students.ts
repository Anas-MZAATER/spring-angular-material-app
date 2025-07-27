import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from "../model/students.model";
import {StudentsService} from "../services/students.service";


@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
  studentCode! : string;
  students! :Array<Student>;
  studentsDataSource! : MatTableDataSource<Student, MatPaginator>
  public displayedColumns=["id","firstName","lastName","code","programId","actions"];


  //pour ajouter la pagination
  // la "!" pour ne pas l'initialiser
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pour le tri
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activatedRoute : ActivatedRoute,
              private studentsService : StudentsService,
              private router : Router) {
  }


  ngOnInit(): void {
    this.studentsService.getAllStudents().subscribe({
      next : data => {
        this.studentCode = this.activatedRoute.snapshot.params['code'];
        this.students =data;
        this.studentsDataSource = new MatTableDataSource<Student>(this.students)
        //maintenant en affiche notre dataSource dans la partie html
        this.studentsDataSource.paginator = this.paginator;
        this.studentsDataSource.sort = this.sort;
      },
      error:err=>{
        console.log(err)
      }
    })
  }


  //pour la recherche sans data-binding(solution classic)
  // filterStudents($event: Event) {
  //   let value = (event?.target as HTMLInputElement).value;
  //   this.dataSource.filter =value;
  // }

  // Rendre la recherche insensible à la casse sans data-binding(solution classic)
  filterStudents($event: Event) {
    const target = $event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase(); // normalisation
    this.studentsDataSource.filter = value;
  }

  // getPayments(students:any) {
  //   this.router.navigateByUrl("/payments")
  //   //=>injection de la class Router
  // }
  getPayments(student:Student) {
    this.router.navigateByUrl(`/template/studentDetails/${student.code}`)
    // this.router.navigateByUrl("/admin/studentDetails/"+student.code)
    //=>injection de la class/Service Router
  }

  newPayment(student:Student) {
    this.router.navigateByUrl(`template/newPayment/${student.code}`)
  }

  //?????// protected readonly Element = Element;
}
