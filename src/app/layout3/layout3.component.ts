import {Component, OnInit} from '@angular/core';
import {AuthService,AdminService} from "../core/serivices";

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
