import {Component, OnInit} from '@angular/core';
import {AuthService,AdminService} from "../core/serivices";

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})

export class Layout2Component implements OnInit {
  
  menuItems = [
    {path: 'instructors', name:'My Courses'}
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
