import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { Manager, ManagerService } from 'src/app/services/manager.service';

@UntilDestroy()

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public fb: FormBuilder, public router : Router, public managerService : ManagerService) { }

  
  get first_name() {
    return this.signUpForm.get('first_name')
  }

  get last_name() {
    return this.signUpForm.get('last_name')
  }

  get email() {
    return this.signUpForm.get('email')
  }


  get password() {
    return this.signUpForm.get('password')
  }

  get address() {
    return this.signUpForm.get('address')
  }

  get dob() {
    return this.signUpForm.get('dob')
  }

  get company() {
    return this.signUpForm.get('company')
  }


  signUpForm = this.fb.group({
    first_name : ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    last_name : ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    address : ['', [Validators.required, Validators.minLength(3)]],
    dob : ['', Validators.required],
    company : ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]]
  })

  ngOnInit(): void {
  }

  signup(form : Manager) {
    console.log(form)
    this.managerService.add_manager(form)
    .pipe(untilDestroyed(this))
    .subscribe(data => {
      console.log(data)
      this.router.navigate(['login'])
    })
  }
}
