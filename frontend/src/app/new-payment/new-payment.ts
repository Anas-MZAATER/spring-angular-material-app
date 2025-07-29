import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.html',
  styleUrl: './new-payment.css'
})
export class NewPayment implements OnInit {
  paymentFormGroup! :FormGroup;
  studentCode! : string;
  paymentTypes :string[]= [];
  pdfFileUrl! :string;
  showSpinner :boolean=false;

  constructor(private fb:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private studentsService:StudentsService) {
  }

  ngOnInit(): void {
    for (let elt in PaymentType){
      let value =PaymentType[elt];
      if(typeof value ==='string'){
        this.paymentTypes.push(value);
      }
    }
    this.studentCode=this.activatedRoute.snapshot.params['code'];
    this.paymentFormGroup=this.fb.group({
      studentCode : this.fb.control(this.studentCode),
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      fileSource : this.fb.control(''),
      fileName : this.fb.control('')
    });
    }


  public selectFile(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
    this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    this.showSpinner=true;
    //// get the data from the paymentFormGroup
    // assurer la bon format de la date
    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    let formData = new FormData();
    formData.set('date',formattedDate)
    formData.set('type',this.paymentFormGroup.value.type)
    formData.set('amount',this.paymentFormGroup.value.amount)
    formData.set('studentCode',this.paymentFormGroup.value.studentCode)
    formData.set('file',this.paymentFormGroup.value.fileSource)
    this.studentsService.savePayment(formData).subscribe({
      next : data =>{
        alert('payment saved successfully!')
        this.showSpinner=false;
      },
      error : err =>{
        console.log(err);
        alert('Request failed: Please ensure all fields are filled out correctly.');
        this.showSpinner=false;
      }
    });
  }

  afterLoadComplete(event: any) {
    console.log(event);
  }
}
