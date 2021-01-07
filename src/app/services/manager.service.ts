import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';


export interface Manager  {
  first_name : string,
  last_name : string,
  email : string,
  password : string,
  address : string,
  dob : string,
  company : string
}

export interface Credentials {
  email : string,
  password : string
}


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient, public urlservice : UrlService) { }

  add_manager(data : Manager): Observable<Manager[]> {
    return this.http.post<Manager[]> (`${this.urlservice.url}managers`, data) 
  }

  login_manager(cred : Credentials): Observable<Manager[]> {
    return this.http.post<Manager[]> (`${this.urlservice.url}login`, cred)    
  }
}
