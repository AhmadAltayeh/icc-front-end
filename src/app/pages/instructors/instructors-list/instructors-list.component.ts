import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../core/serivices/admin/admin.service";
import {Column, FetchProvider} from "../../../partials/table/table.component";
import {PaginationQuery} from "../../../core/models";
import {SearchFilterComponent} from "../../../partials/search-filter/search-filter.component";
import {InstructorFormComponent} from "../instructor-form/instructor-form.component";
import {FormGroup} from "@angular/forms";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {InstructorViewComponent} from '../instructor-view/instructor-view.component';

@Component({
  selector: 'app-instructors-list',
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.scss']
})
export class InstructorsListComponent {
  @ViewChild(SearchFilterComponent, {static: true}) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(InstructorFormComponent) public _adminFormComponent!: InstructorFormComponent
  @ViewChild(InstructorViewComponent) public _adminViewComponent!: InstructorViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any

  constructor(public _adminService: AdminService) {
  }

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    const search = this._searchFilterComponent.getFilters()
    if (search) {
      query.addParams('keyword', search)
      return this._adminService.searchInstructors(query);
    }
    return this._adminService.getInstructors(query);
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