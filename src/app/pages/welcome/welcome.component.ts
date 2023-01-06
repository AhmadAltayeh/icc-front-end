import { Component, OnInit } from '@angular/core';
import { TokenManager } from 'src/app/core/serivices';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private _token: TokenManager,private _router: Router) { }

  ngOnInit() {
    if(this._token.isLogged){
      console.log(this._token.accessToken);
      
      this._router.navigate(['/students']);
    }
  }

}
