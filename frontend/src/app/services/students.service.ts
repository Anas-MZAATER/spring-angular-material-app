import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/students.model";



@Injectable({providedIn: 'root'})
export class StudentsService {

  constructor(private http : HttpClient) {
  }

  public getAllPayments():Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(environment.backendHost+"/payments") // this.http.get<Array<Payments>>(`${environment.backendHost}/payments`)
  }

  public getAllStudents():Observable<Array<Student>> {
    return this.http.get<Array<Student>>(environment.backendHost+"/students") // this.http.get<Array<StudentsService>>(`${environment.backendHost}/payments`)
  }

  public getStudentPayments(code:string):Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(environment.backendHost+`/students/${code}/payments`) // this.http.get<Array<StudentsService>>(`${environment.backendHost}/payments`)
  }
  public savePayment(formData:any):Observable<Payment> {
    return this.http.post<Payment>(environment.backendHost+`/payments`,formData) // this.http.get<Array<StudentsService>>(`${environment.backendHost}/payments`)
  }

}
