import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {AdminService} from 'src/app/core/serivices';
import { Column } from 'src/app/partials/table/table.component';
import { TableComponent } from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
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
    facebookUrl: ['', [Validators.required]],
    address: ['', [Validators.required]],
    iban: ['', [Validators.required]],
    roleId:['', [Validators.required]]
  })
  this.passwordForm = this._fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
  })
  }

  ngOnInit(): void {
    console.log(this.rowData);
    this.fillAdminDetails(this.rowData.id);

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

  displayColumns : Column[] = [];

  public fillAdminDetails(id:number){
    this._adminService.getOneAdmin(this.rowData.id).subscribe((json)=>{
      console.log(json);
      this.detailsForm.setValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        address: json.data.address,
        iban: Number(json.data.iban),
        roleId: json.data.role.title,
      })
      this.roleName = json.data.role.title;
    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent;
  Delete(){
    this._adminService.deleteOneAdmin(this.rowData.id).subscribe((json)=>{
      console.log(json)
    })
  window.location.reload();
    
  }
}
