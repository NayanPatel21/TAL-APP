import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Occupation } from './occupation.model';

@Injectable({
  providedIn: 'root'
})
export class MonthlyPremiumService {

  constructor(private http: HttpClient) { }

  readonly baseURL = environment.monthlyPremiumAPI;  
    refreshList() {
      return  this.http.get(this.baseURL);
  }
}
