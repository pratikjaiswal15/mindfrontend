import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emp_list: any;
  closeResult = '';
  emp_id: string = '';

  constructor(public empservice: EmployeeService, private modalService: NgbModal, public fb: FormBuilder, public authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.empservice.getall_employees()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        console.log(data)
        this.emp_list = data
      })
  }

  empForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    dob: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]]
  })


  get first_name() {
    return this.empForm.get('first_name')
  }

  set first_name(n) {
    this.empForm.controls['first_name'].setValue(n)
  }

  get last_name() {
    return this.empForm.get('last_name')
  }

  set last_name(n) {
    this.empForm.controls['last_name'].setValue(n)
  }

  get email() {
    return this.empForm.get('email')
  }


  set email(n) {
    this.empForm.controls['email'].setValue(n)
  }

  get address() {
    return this.empForm.get('address')
  }

  set address(n) {
    this.empForm.controls['address'].setValue(n)
  }

  get dob() {
    return this.empForm.get('dob')
  }


  set dob(n) {
    this.empForm.controls['dob'].setValue(n)
  }

  get city() {
    return this.empForm.get('city')
  }

  set city(n) {
    this.empForm.controls['city'].setValue(n)
  }

  get mobile_number() {
    return this.empForm.get('mobile_number')
  }

  set mobile_number(n) {
    this.empForm.controls['mobile_number'].setValue(n)
  }

  logout() {
    this.authenticationService.logout()
  }

  delete(emp_id) {
    console.log(emp_id)
    this.empservice.delete_employee(emp_id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        console.log(data)
      })

  }


  open(content, emp) {
    console.log(emp)
    if (emp) {
      this.emp_id = emp._id
      this.first_name = emp.first_name
      this.last_name = emp.last_name
      this.email = emp.email
      this.mobile_number = emp.mobile_number
      this.address = emp.address
      this.dob = emp.dob
      this.city = emp.city
    }


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save(val, emp_id) {
    console.log(val)
    console.log(emp_id)
    if(emp_id){
      this.empservice.update_employee(val, emp_id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        console.log(data)
      })
    }
    else{

      console.log('new')
      this.empservice.add_employee(val)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        console.log(data)
      })

    }
    this.modalService.dismissAll()

  }

  delete_modal(del, id) {
    this.emp_id = id
    console.log(id)
    this.modalService.open(del, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

}
