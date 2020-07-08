import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  get(url): Observable<any> {
    return this.http.get<any>(environment.ServerURI + url).pipe(
      map(res => {
        return res;
      }));
  }

  post(url, payload) {
    return this.http.post(environment.ServerURI + url, payload);
  }

  successHandling(message){
    this.toastr.success(message);
  }
  
  exceptionHandling(error){
    if(error && error.error && error.error.message){
      this.toastr.error(error.error.message);
    }
    else if(error && error.message){
      this.toastr.error(error.message);
    }
    else{
      this.toastr.error(error);
    }
    
  }
}
