import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';


function randomString(len: number = 5): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 0; i < len; i++) {
    str += letters[Math.floor(Math.random() * letters.length)];
  }
  return str;
}

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
  // la "!" pour ne pas l'initialiser
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pour le tri
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private router : Router) {
  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // initialisation static des étudiants
    this.students=[];
    for(let i=4;i<40;i++){
      this.students.push(
        {
          id : i,
          //initialiser les champs de nom et prenom par un chain aléatoire
          firstName: randomString(4),
          lastName: randomString(6),
          payments:[]
        }
      );
    }
    this.dataSource=new MatTableDataSource(this.students)
    //maintenant en affiche notre dataSource dans la partie html
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    //pour ajouter la pagination
    this.dataSource.paginator = this.paginator;
    //pour le tri
    this.dataSource.sort = this.sort;
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
    this.dataSource.filter = value;
  }

  getPayments(students:any) {
    this.router.navigateByUrl("/payments")
    //=>injection de la class Router
  }
}
