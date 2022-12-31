import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {AdminService} from 'src/app/core/serivices';
import { Column } from 'src/app/partials/table/table.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabSelected:number=0

  roleName: string = '';
  titleAlert: string = 'This field is required';

  form: FormGroup
  passwordForm:FormGroup
  constructor(private _fb: FormBuilder,private _adminService:AdminService,private router:Router) {
    
  this.form = this._fb.group({
    firstName: ['', [Validators.nullValidator]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
    address: ['', [Validators.required]],
    iban: ['', [Validators.required]],
    roleId:['', [Validators.required]]
  })
  this.passwordForm = this._fb.group({
    oldPassword:['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
  })
  }
  displayColumns : Column[] = [];
  data:any
  ngOnInit(): void {
    this._adminService.getAdminProfile().subscribe(data=>{
      
      this.data=data.data
      this.fillAdminDetails()

  })
    this._adminService.getRoles().subscribe((json)=>{
      json.data.forEach((element: any) => {
        this.displayColumns.push(
          new Column({
            key: element.id,
            title: element.name
          })
        )});    
      }); 
  }
  
  public fillAdminDetails(){
      console.log(this.tabSelected);
      
      this.form.setValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        facebookUrl: this.data.facebookUrl,
        address: this.data.address,
        iban: Number(this.data.iban),
        roleId: this.data.role.title,
      })
      this.roleName = this.data.role.title;
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
  // onClickTabOne(){
  //   this.tabSelected=0
  // }
  // onClickTabTwo(args: any[]){
  //   this.tabSelected=args[0].index
  //     console.log(this.tabSelected);

  // }
  submitUpdateForm() {
    console.log(this.tabSelected);
    
    let form: FormGroup;
    if (this.tabSelected == 0) {
      form = this.form;
      if (form.valid) {
        form.disable()
        this._adminService.updateAdmin(this.data.id, form.value).subscribe({
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
        this._adminService.updateAdminPassword(obj).subscribe({
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
