import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { MonthlyPremium } from '../shared/monthly-premium.model';
import { MonthlyPremiumService } from '../shared/monthly-premium.service';
import { Occupation } from '../shared/occupation.model';

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.css']
})
export class MonthlyPremiumComponent implements OnInit {

  formData: MonthlyPremium ;
  list: Occupation[];
  birthdate: Date;
  maxDate: any;
  deathPremium  :number=0;
  errorMessage:string | undefined= undefined;

  constructor(public service: MonthlyPremiumService) { }

  ngOnInit(): void {
    this.bindOccupationList();
    this.formData = new MonthlyPremium();   
    this.formData.birthDate= this.GetDate();//new Date();   
    this.maxDate= this.GetDate();  
  }

  onSubmit() {
    this.calculatePremium();
   }

   bindOccupationList()
   {
    this.service.refreshList().subscribe(
      {
        next: (res) => {  
          this.list = res as Occupation[];   
          //Dropdown default selection
          this.formData.occupationFactor= 1;
        },
      error: (e) => this.handleError(e)      
    }); 
  }

  private handleError(error: HttpErrorResponse) {
     if (error.status === 0) {     
      this.errorMessage = `An error occurred: ${ error.message}`;
    } else {    
      this.errorMessage = `Backend returned code ${error.status}, body was: ${ error.message}`;   
    }  
    this.errorMessage += 'Something bad happened; please try again later.'; 
    return throwError(() => new Error(this.errorMessage));
  }

  private GetDate():any
  {
    var date:any= new Date();
    var todayDate:any= date.getDate();
    var month:any= date.getMonth();
    var year:any= date.getFullYear();
    
    if(todayDate < 10)
      {
       todayDate='0'+todayDate;
      }
    if(month < 10)
      {
       month ='0'+month ;
      }
    return year + '-' + month + '-' + todayDate;
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
    this.birthdate=event.target.value;
    if (this.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
      this.formData.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      }
        this.calculatePremium();
    }

  calculatePremium() {
      if( this.formData.deathSumInsured  != undefined && this.formData.occupationFactor != undefined)
         this.deathPremium = (this.formData.deathSumInsured * (+this.formData.occupationFactor) * this.formData.age) /1000 * 12;
      else
         this.deathPremium=0;
    }
}
