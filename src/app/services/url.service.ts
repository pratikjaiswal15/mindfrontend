import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url : string;
  constructor() { 
    this.url = 'http://localhost:4000/'
  }
}
