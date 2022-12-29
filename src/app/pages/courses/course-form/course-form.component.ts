import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import {Column, FetchProvider} from "../../../partials/table/table.component";


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
form: FormGroup
  constructor(private _fb: FormBuilder, public _adminService:AdminService) {
  this.form = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
    address: ['', [Validators.required]],
    iban: ['', [Validators.required]],
    roleId: ['', [Validators.required]]
  })
  }

  displayColumns : Column[] = [];

  ngOnInit(): void {

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
}
