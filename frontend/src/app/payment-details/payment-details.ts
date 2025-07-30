import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.css'
})
export class PaymentDetails implements OnInit{
  paymentId! : number;
  pdfFileUrl! :any;

  constructor(private studentsService:StudentsService,
              private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    //BY ActivatedRoute Service
    this.paymentId=this.route.snapshot.params['paymentId'];
    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next : data =>{
        let blob = new Blob( [data], { type: '.pdf' });
        this.pdfFileUrl = window.URL.createObjectURL(blob)
      },
      error : err =>{
        console.log(err)
      }
    });
  }

  afterLoadComplete(event: any) {
    console.log(event);
  }

}
