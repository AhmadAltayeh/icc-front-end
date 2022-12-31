import {Component, OnInit,EventEmitter} from '@angular/core';
import {AuthService,AdminService,} from "../core/serivices";
import { Output } from '@angular/core';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() profileData = new EventEmitter<any>();
  
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
    this._authService.logout().subscribe()
  }

  reload(){
    window.location.reload();
  }
  data:any
  onClick(){
    
    this._adminService.getAdminProfile().subscribe(data=>{
      
      this.data=data.data
      this.profileData.emit(this.data)
    });
}

}
