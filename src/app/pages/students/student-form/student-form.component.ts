import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import { Column } from "../../../partials/table/table.component";

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  form: FormGroup
  constructor(private i18n: NzI18nService, private _fb: FormBuilder, public _adminService: AdminService) {
    this.form = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],

    })
  }
  date = null;
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  displayColumns: Column[] = [];

  ngOnInit(): void {
    this.i18n.setLocale(en_US);

  }
}
