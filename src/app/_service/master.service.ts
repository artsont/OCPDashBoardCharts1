import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private baseUrl = 'https://9gy1l.wiremockapi.cloud';  

  constructor(private http: HttpClient) { }

  getLineChartData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/LineData`); 
  }

  getVerticalBarChartData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verticalBarData`); 
  }

  getHorizontalBarChartData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/horizontalBarData`); 
  }

  getDonutChartData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/donutChartData`);  
}
}
