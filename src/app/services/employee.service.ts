import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

export interface Employee  {
  first_name : string,
  last_name : string,
  email : string,
  address : string,
  dob : string,
  mobile_number : string,
  city : string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, public urlservice : UrlService) { }

  
  add_employee(data : any): Observable<any[]> {
    return this.http.post<any[]> (`${this.urlservice.url}employees`, data) 
  }

  getall_employees(): Observable<any> {
    return this.http.get<any[]> (`${this.urlservice.url}employees`) 
  }

  
  update_employee(data : any, id ): Observable<any[]> {
    return this.http.patch<any[]> (`${this.urlservice.url}employees/${id}`, data) 
  }

  delete_employee(id) : Observable<any>{
    return this.http.delete<any>(`${this.urlservice.url}employees/${id}`)
  }
}
