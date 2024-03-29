import {Component, OnInit} from '@angular/core';
import {AuthService,AdminService} from "../core/serivices";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  menuItems = [
    {path: 'admins/admins', name: 'Admins'},
    {path: 'admins/instructors', name: 'Instructors'},
    {path: 'admins/students', name: 'Students'}
  ]

  dashboardmenuItems = [
    {path: 'stats', name:'Statistics'}
  ]

  coursemenuItems = [
    {path: 'admins/courses', name:'Courses'},
    {path: 'admins/reviews', name:'Reviews'}
  ]

  isCollapsed = false;
  dropDownItems=[
    {path:'admins/profile',name:'Profile'}
  ]
  constructor(private _authService: AuthService,private _adminService: AdminService) {
  }

  ngOnInit(): void {
    this._adminService.getAdminProfile().subscribe(data=>{
      this.data=data.data
    });    
  }

  logout() {
    this._authService.logout();
  }

  reload(){
    window.location.reload();
  }
  data:any
  onClick(){
    this._adminService.getAdminProfile().subscribe(data=>{
      this.data=data.data
    });
}

}
