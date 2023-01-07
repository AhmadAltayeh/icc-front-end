import { Component, OnInit } from '@angular/core';
import { TokenManager } from 'src/app/core/serivices';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/serivices';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isLoggedOut?:boolean=true
  constructor(private _token: TokenManager,private _router: Router,private _authService: AuthService) { }

  ngOnInit() {
    this.isLoggedOut=!this._token.isLogged
    
    // if(this._token.isLogged){
    //   this._router.navigate(['/students']);
    // }
  }
  logout() {
    this._authService.logout();
  }
}
