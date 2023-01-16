import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,  Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { StudentService } from 'src/app/core/serivices';
import{ReactiveFormsModule,FormControl} from "@angular/forms"
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {
  res:any
  public ff!: FormGroup
  constructor(public _fb: FormBuilder, public _studentService:StudentService,private _router: Router) {
    this.ff = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    
    })
  }


  submitForm(): void {
    console.log(this.ff.value);
    
    if (this.ff.valid) {
      
      this._studentService.registerStudent(this.ff.value).subscribe({
        next: () => {
          
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      Object.values(this.ff.controls).forEach(control => {
        
        if (control.invalid) {
          this.ff.markAsDirty();
          this.ff.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

 
  onClick(){
    this._router.navigate(['/auth/login']);
  }
  
  


}