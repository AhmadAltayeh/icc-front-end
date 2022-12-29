import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/serivices";

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

  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout().subscribe()
  }

  reload(){
    window.location.reload();
  }

}
