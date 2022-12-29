import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../core/serivices/admin/admin.service";
import {Column, FetchProvider} from "../../../partials/table/table.component";
import {PaginationQuery} from "../../../core/models";
import {SearchFilterComponent} from "../../../partials/search-filter/search-filter.component";
import {AdminFormComponent} from "../admin-form/admin-form.component";
import {FormGroup} from "@angular/forms";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {AdminViewComponent} from '../admin-view/admin-view.component';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent {
  @ViewChild(SearchFilterComponent, {static: true}) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(AdminFormComponent) public _adminFormComponent!: AdminFormComponent
  @ViewChild(AdminViewComponent) public _adminViewComponent!: AdminViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any

  constructor(public _adminService: AdminService) {
  }

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    const search = this._searchFilterComponent.getFilters()
    if (search) {
      query.addParams('keyword', search)
      return this._adminService.searchAdmins(query);
    }
    return this._adminService.getAdmins(query);
  }

  displayColumns = [
    new Column({
      key: 'id',
      title: 'ID',
      width: '100px',
    }),
    new Column({
      key: 'firstName',
      title: 'First Name',
    }),
    new Column({
      key: 'lastName',
      title: 'Last Name',
    }),
    new Column({
      key: 'phoneNumber',
      title: 'Phone Number',
    }),
    new Column({
      key: 'email',
      title: 'Email',
    }),
    new Column({
      key: 'phoneNumber',
      title: 'Phone Number',
    }),
    new Column({
      key: 'isActive',
      title: 'Is Active',
    })
  ];

  validateForm(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
        form.controls[key].updateValueAndValidity();
      }
    }
  }

  submitForm() {
    const form = this._adminFormComponent.form
    if (form.valid) {
      this.loading = true
      form.disable()
      this._adminService.createAdmin(form.value).subscribe({
        next: () => {
          this.loading = false
          this.drawer.close()
        },
        error: () => {
          form.enable()
          this.loading = false
        }
      })
    } 
    else {
      this.validateForm(form);
    }
  }
  public clickEvent(data: any){    
    this.rowData = data;
    this.drawer.open();
}
  formClick=false
  viewClick=false
  public onClick(name: string, data?:any){
    if(name == "form"){
      this.formClick=true;
      this.drawer.open();
    }
    else{
      this.rowData = data;
      this.viewClick=true
      this.drawer.open();
    }

  }
  
}
