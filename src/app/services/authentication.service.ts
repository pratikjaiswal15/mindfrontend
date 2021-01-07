import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor() { 
    this.checkToken()
  }
  async checkToken(){

    const token = await localStorage.getItem('token')
    console.log(token)
    if(token !=null || token != undefined){
      this.authenticationState.next(true)
    }

    else {
      this.authenticationState.next(false)
    }

  }


  async login(data :any) {

    await localStorage.setItem('token', data.accessToken)
    await localStorage.setItem('refresh-token', data.refreshToken)
    await localStorage.setItem('user_id', data.user_id)

    this.authenticationState.next(true)   
  }
 
  async logout() {
    await localStorage.clear()
    this.authenticationState.next(false)
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

}
