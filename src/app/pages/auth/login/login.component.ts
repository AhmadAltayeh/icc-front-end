import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/serivices";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component2.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  res:any
  submitForm(): void {
    if (this.form.valid) {
      this._authService.login(this.form.value).subscribe({next: (res) => {
          console.log(res);
          let x=res.roleGroup.toLowerCase()
          this._router.navigate([x])
        }})
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          this.form.markAsDirty();
          this.form.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  onClick(){
    this._router.navigate(['/register']);
  }
}
