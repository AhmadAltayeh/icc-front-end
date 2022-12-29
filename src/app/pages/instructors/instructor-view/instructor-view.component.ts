import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from 'src/app/core/serivices';

@Component({
  selector: 'app-view-form',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.scss']
})
export class InstructorViewComponent implements OnInit {
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
    this.fillInstructorDetails(this.rowData.id)
    
  }

  public fillInstructorDetails(id:number){
    this._adminService.getOneInstructor(this.rowData.id).subscribe((json)=>{
      console.log(json);
      this.form.patchValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
      })
    });
  }
}
