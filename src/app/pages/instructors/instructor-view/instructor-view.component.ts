import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/serivices';
import { Column, TableComponent } from 'src/app/partials/table/table.component';
import { NzMessageService } from 'ng-zorro-antd/message';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-view-form',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.scss'],
})
export class InstructorViewComponent implements OnInit {
  @Input() rowData: any = '';
  @Output() tabChanged = new EventEmitter<number>();
  detailsForm: FormGroup;
  passwordForm: FormGroup;
  radioValue: any = '';
  loading = false;
  imageUrl?: string;
  selectedFile: any;
  passwordVisible = false;
  passwordVisible2 = false;
  password: any;
  confirmPassword: any;
  listOfData: any[] = [];
  constructor(
    private _fb: FormBuilder,
    public _adminService: AdminService,
    private msg: NzMessageService
  ) {
    this.detailsForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
      imageUrl: ['', [Validators.nullValidator]],
      isVolunteer: ['', [Validators.required]],
      salary: ['', Validators.nullValidator],
    });
    this.passwordForm = this._fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[A-Z]).{8,20}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[A-Z]).{8,20}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.fillInstructorDetails(this.rowData.id);
  }

  displayColumns: Column[] = [];

  displayCourseColumns = [
    new Column({
      key: 'id',
      title: 'ID',
      width: '100px',
    }),
    new Column({
      key: 'name',
      title: 'Name',
    }),
    new Column({
      key: 'startDate',
      title: 'Start Date',
    }),
    new Column({
      key: 'endDate',
      title: 'End Date',
    }),
  ];

  removeCourseFromInstructor(courseId: any) {
    this.loading = true;
    this._adminService
      .removeCourseFromInstructor({
        instructorId: this.rowData.id,
        courseId: courseId,
      })
      .subscribe((json) => {
        this.loading = false;
        this.fillInstructorDetails(this.rowData.id);
      });
  }

  public fillInstructorDetails(id: number) {
    this._adminService.getOneInstructor(this.rowData.id).subscribe((json) => {
      this.radioValue = json.data.isVolunteer;

      this.detailsForm.patchValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        imageUrl: json.data.imageUrl,
        isVolunteer: json.data.isVolunteer,
        salary: json.data.salary,
      });
    });

    this._adminService
      .getInstructorCourses(this.rowData.id)
      .subscribe((json) => {
        this.listOfData = json.data;
        console.log(this.listOfData);
      });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent();
  Delete() {
    this._adminService.deleteOneAdmin(this.rowData.id).subscribe((json) => {
      console.log(json);
    });
    window.location.reload();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.detailsForm.disable();
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this._adminService
        .uploadFile(this.selectedFile.file)
        .subscribe((json) => {
          this.detailsForm.patchValue({
            imageUrl: json.data.mediaUrl,
          });
          this.detailsForm.enable();
        });
    });
    reader.readAsDataURL(file);
  }
}
