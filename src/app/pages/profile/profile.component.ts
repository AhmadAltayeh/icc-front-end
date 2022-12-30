import { Component, OnInit,Input } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //@Input() logged:any = ''
  constructor() { }

  ngOnInit(): void {
    //console.log(this.logged);
    
  }

}
