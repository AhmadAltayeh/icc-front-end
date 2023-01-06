import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/serivices/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component2.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  res:any
  

  constructor( private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    
  }
 onClick(){
    this._router.navigate(['/auth/login']);
  }
}
