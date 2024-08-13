import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeBuilderService {

  baseURL = 'https://resume-builder-zep3.onrender.com';
  
  constructor(private httpService: HttpService, private http: HttpClient) { }

  createPdf(resumeBody: any): Observable<any> {
    return this.httpService.post(this.baseURL + '/create-pdf', resumeBody).pipe(map((data) => {
      return data;
    }));
  }

  fetchPdf(): Observable<any> {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(this.baseURL + '/fetch-pdf', httpOptions);
  }
}
