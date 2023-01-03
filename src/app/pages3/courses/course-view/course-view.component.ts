import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { PaginationQuery } from 'src/app/core/models';
import {AdminService, StudentService} from 'src/app/core/serivices';
import { Column, FetchProvider, TableComponent } from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  @ViewChild('drawer') public drawer!: NzDrawerRef
  @Input() rowData: any = '';
  courseId:any;
   s:string[]=[];
  constructor(private _fb: FormBuilder,public _studentService: StudentService) {
  
  }

  ngOnInit(): void {
  
    this.getMaterial()
  }
 
  getCourseId(event:any){
    this.courseId=event.target.value;
  }

getMaterial(){
  this._studentService.getOneCourse(this.rowData.id).subscribe((json)=>{
    console.log(json);
   
   if(json.data.materials)
    json.data.materials.forEach((_item: any) => {
       this.s.push(_item.url)

    });
  })
}
 
  displayColumns : Column[] = [];

  displayMaterial = [
    new Column({
      key: 'url',
      title: 'URL',
    }),
    
    
  ];

 
  
}
