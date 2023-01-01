import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {AdminService} from 'src/app/core/serivices';
import { Column } from 'src/app/partials/table/table.component';
import { TableComponent } from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  @ViewChild('drawer') public drawer!: NzDrawerRef
  @Input() rowData: any = '';
  roleName: string = '';
  @Output() tabChanged = new EventEmitter<number>;
detailsForm: FormGroup;
passwordForm: FormGroup;
  constructor(private _fb: FormBuilder,public _adminService: AdminService) {
  this.detailsForm = this._fb.group({
    firstName: ['', [Validators.nullValidator]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth:['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
  })
  this.passwordForm = this._fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
  })
  }

  ngOnInit(): void {
    console.log(this.rowData);
    this.fillStudentDetails(this.rowData.id);

    
  }

  displayColumns : Column[] = [];

  public fillStudentDetails(id:number){
    this._adminService.getOneStudent(this.rowData.id).subscribe((json)=>{
      console.log(json);
      this.detailsForm.setValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        dateOfBirth:json.data.dateOfBirth,
      })
    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent;
  Delete(){
    this._adminService.deleteOneStudent(this.rowData.id).subscribe((json)=>{
      console.log(json)
    })
  window.location.reload();
    
  }
}
