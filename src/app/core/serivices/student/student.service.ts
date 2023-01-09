import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { PaginationQuery, PaginationResult } from '../../models';
import { Observable } from 'rxjs';
import { AdminModel } from '../../models/admin.model';
import {
  FULL_RESPONSE,
  SNACKBAR_OPTIONS,
} from '../../interceptors/teardown/http-context';
import { StudentModel } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}
  getAllCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext();
    context.set(FULL_RESPONSE, true);
    return this.httpClient.get<PaginationResult<any>>(
      `student/students/courses?${query.asString()}`,
      { context }
    );
  }

  getAllStudentCourses(
    query: PaginationQuery
  ): Observable<PaginationResult<any>> {
    const context = new HttpContext();

    context.set(FULL_RESPONSE, true);
    return this.httpClient.get<PaginationResult<any>>(
      `student/students/my-courses?${query.asString()}`,
      { context }
    );
  }
  registerStudent(reg: StudentModel.reg) {
    const context = new HttpContext();
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' });
    return this.httpClient.post('student/students/signup', reg, { context });
  }
  registerCourseToStudent(regCourse: StudentModel.enrollCourse) {
    const context = new HttpContext();
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' });
    return this.httpClient.post('student/students/courses', regCourse, {
      context,
    });
  }
  getCourseReview() {}
  searchCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext();
    context.set(FULL_RESPONSE, true);
    return this.httpClient.get<PaginationResult<any>>(
      `student/courses/search?${query.asString()}`,
      { context }
    );
  }
  getOneCourse(id: number): Observable<any> {
    const context = new HttpContext();
    context.set(FULL_RESPONSE, true);
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`student/students/courses/${id}`, {
      context,
    });
  }
  getStudentProfile() {
    const context = new HttpContext();
    context.set(FULL_RESPONSE, true);
    return this.httpClient.get<any>(`student/students/profile`, { context });
  }
  updateStudent(studentData: StudentModel.Student) {
    const context = new HttpContext();
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' });
    return this.httpClient.put(`student/students/profile`, studentData, {
      context,
    });
  }
  updateStudentPassword(changePassword: StudentModel.ResetPassword) {
    const context = new HttpContext();
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' });
    return this.httpClient.patch(`student/students/password`, changePassword, {
      context,
    });
  }
}
