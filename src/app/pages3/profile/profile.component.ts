import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {AdminService} from 'src/app/core/serivices';
import {StudentService} from 'src/app/core/serivices';
import { Column } from 'src/app/partials/table/table.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabSelected:number=0
disableInput = true

  roleName: string = '';
  titleAlert: string = 'This field is required';

  form: FormGroup
  passwordForm:FormGroup
  constructor(private _fb: FormBuilder,private _studentService:StudentService,private router:Router) {
    
  this.form = this._fb.group({
    firstName: ['', [Validators.nullValidator]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
    dateOfBirth:['', [Validators.required]]
  })
  this.passwordForm = this._fb.group({
    oldPassword:['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
  })
  }
  displayColumns : Column[] = [];
  data:any
  userData:any
  ngOnInit(): void {
    this._studentService.getStudentProfile().subscribe(json=>{
      this.data=json.data
      this.fillStudentDetails();
    })
    
  }
  
  public fillStudentDetails(){
      
      this.form.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        facebookUrl: this.data.facebookUrl,
        dateOfBirth: this.data.dateOfBirth,
      })
      this.form.get('email')?.disable();
    };
    validateForm(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
        form.controls[key].updateValueAndValidity();
      }
    }
  }
  submitUpdateForm() {
    console.log(this.tabSelected);
    
    let form: FormGroup;
    if (this.tabSelected == 0) {
      form = this.form;
      if (form.valid) {
        form.disable()
        console.log(form.value);
        
        this._studentService.updateStudent(form.value).subscribe({
          error: () => {
            form.enable()
          }
        })
      }
      else {
        this.validateForm(form);
      }
    } else if (this.tabSelected == 1) {
      
      form = this.passwordForm;
      if (form.valid) {
        form.disable()
        let obj = {
          id:this.data.id,
          ...form.value
        }
        this._studentService.updateStudentPassword(obj).subscribe({
          error: () => {
            form.enable()
          }
        })
      }
      else {
        this.validateForm(form);
      }
    }
  }
  
  
}
