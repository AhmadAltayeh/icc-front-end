import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {PaginationQuery, PaginationResult} from "../../models";
import {Observable} from "rxjs";
import {AdminModel} from "../../models/admin.model";
import {FULL_RESPONSE, SNACKBAR_OPTIONS} from "../../interceptors/teardown/http-context";
import { StudentModel } from '../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) {
  }

  getStudentCourses(){
    
  }
}