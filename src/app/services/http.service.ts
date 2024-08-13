import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders;
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }
  get(url: string) {
    return this.http.get(url, { headers: this.httpHeaders });
  }
  post(url: string, requestBody: any = null) {
    return this.http.post(url, requestBody, { headers: this.httpHeaders })
  }
}
