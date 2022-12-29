import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from 'src/app/core/serivices';

@Component({
  selector: 'app-view-form',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  @Input() rowData: any = '';
form: FormGroup
  constructor(private _fb: FormBuilder,public _adminService: AdminService) {
  this.form = this._fb.group({
    firstName: ['', [Validators.nullValidator]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
    address: ['', [Validators.required]],
    iban: ['', [Validators.required]],
  })
  }

  ngOnInit(): void {
    console.log(this.rowData);
    this.fillStudentDetails(this.rowData.id)
    
  }

  public fillStudentDetails(id:number){
    this._adminService.getOneStudent(this.rowData.id).subscribe((json)=>{
      console.log(json);
      this.form.patchValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
      })
    });
  }
}
