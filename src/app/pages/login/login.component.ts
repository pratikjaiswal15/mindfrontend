import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagerService, Credentials } from 'src/app/services/manager.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/services/authentication.service';

@UntilDestroy()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, public managerService : ManagerService,public authenticationService: AuthenticationService) { }

  
  get email() {
    return this.signInForm.get('email')
  }

  get password() {
    return this.signInForm.get('password')
  }

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  ngOnInit(): void {
  }

  login(cred : Credentials) {
    console.log(cred)
    this.managerService.login_manager(cred)
    .pipe(untilDestroyed(this))
    .subscribe((data : any)  => {
      console.log(data)
       this.authenticationService.login(data)       
    }) 
 }

 logout() {
   this.authenticationService.logout()
 }

}
