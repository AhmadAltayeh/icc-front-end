import {Component, OnInit} from '@angular/core';
import {AuthService,StudentService} from "../core/serivices";

@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styleUrls: ['./layout3.component.scss']
})

export class Layout3Component implements OnInit {
  
  menuItems = [
    {path: 'my-courses', name:'Courses'},
    {path: 'courses', name:'All Courses'}
  ]
  isCollapsed = false;
  dropDownItems=[
    {path:'profile',name:'Profile'}
  ]
  constructor(private _authService: AuthService,private _studentService: StudentService) {
  }
  data?:any
  ngOnInit(): void {
    this._studentService.getStudentProfile().subscribe(json=>{
      this.data=json.data
      console.log(this.data);

    })
  }

  logout() {
    this._authService.logout();
  }

  reload(){
    window.location.reload();
  }
  
  

}
