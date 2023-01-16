import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import { Column } from "../../../partials/table/table.component";
import { NzMessageService } from 'ng-zorro-antd/message';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit {
  loading = false;
  imageUrl?: string;
  form: FormGroup
  radioValue: any = false;
  selectedFile: any;

  constructor(private _fb: FormBuilder, public _adminService: AdminService, private msg: NzMessageService) {
    this.form = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
      imageUrl: ['String', [Validators.required]],
      isVolunteer: ['', [Validators.required]],
      salary: ['', Validators.nullValidator]
    })
  }

  displayColumns: Column[] = [];

  ngOnInit(): void {

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.form.disable();
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this._adminService.uploadFile(this.selectedFile.file).subscribe((json) => {
        this.form.patchValue({
          imageUrl: json.data.mediaUrl
        })
        this.form.enable();
      })
    });
    reader.readAsDataURL(file);

  }
}
