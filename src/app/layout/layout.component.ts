import {Component, OnInit} from '@angular/core';
import {AuthService,AdminService} from "../core/serivices";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  
  menuItems = [
    {path: 'admins', name: 'Admins'},
    {path: 'instructors', name: 'Instructors'},
    {path: 'students', name: 'Students'},
    {path: 'courses', name:'Courses'}
  ]
  isCollapsed = false;
  dropDownItems=[
    {path:'profile',name:'Profile'}
  ]
  constructor(private _authService: AuthService,private _adminService: AdminService) {
  }

  ngOnInit(): void {
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
