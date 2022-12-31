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
  roleName: string = '';
  titleAlert: string = 'This field is required';

  form: FormGroup
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
      this.setChangeValidate()
  }
  
  public fillAdminDetails(){
      
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
  
setChangeValidate() {
    this.form.get('validate')?.valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.form.get('firstName')?.setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.form.get('firstName')?.setValidators(Validators.required);
        }
        this.form.get('firstName')?.updateValueAndValidity();
      }
    )
  }
}
