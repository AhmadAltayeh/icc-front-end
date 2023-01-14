import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from "@angular/common/http";
import { PaginationQuery, PaginationResult } from "../../models";
import { Observable } from "rxjs";
import { AdminModel } from "../../models/admin.model";
import { FULL_RESPONSE, SNACKBAR_OPTIONS } from "../../interceptors/teardown/http-context";
import { CourseModel } from '../../models/course.model';
import { StudentModel } from '../../models/student.model';
import { InstructorModel } from '../../models/instructor.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { query } from '@angular/animations';
// import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpClient: HttpClient) {
  }

  getAdmins(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/admins?${query.asString()}`, { context })
  }
  getAdminProfile(): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`admin/admins/profile`, { context })

  }

  getRoles(): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`admin/admins/roles/admin`, { context })
  }

  searchAdmins(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/admins/search?${query.asString()}`, { context })
  }

  createAdmin(createAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.post(`admin/admins`, createAdmin, { context })
  }

  updateAdmin(id: number, updateAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.put(`admin/admins/${id}`, updateAdmin, { context })
  }

  updateOwnProfile(updateAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.put(`admin/admins/profile`, updateAdmin, { context })
  }

  updateAdminPassword(changePassword: AdminModel.changePassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.patch(`admin/admins/update-password`, changePassword, { context })
  }
  resetAdminPassword(resetPassword: AdminModel.ResetPassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.patch(`admin/admins/reset-password`, resetPassword, { context })
  }

  getOneAdmin(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    console.log(this.httpClient.get<any>(`admin/admins/${id}`, { context }));
    return this.httpClient.get<any>(`admin/admins/${id}`, { context })
  }
  deleteOneAdmin(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    console.log(this.httpClient.get<any>(`admin/admins/${id}`, { context }));
    return this.httpClient.delete<any>(`admin/admins/${id}`, { context })
  }

  getAdminStats(query: any): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true);
    return this.httpClient.get<any>(`admin/stats?date=${query}`, { context })
  }

  //*               *******************Admin dashboard student******************                 *
  getStudents(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/students?${query.asString()}`, { context })
  }

  getOneStudent(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`admin/students/${id}`, { context })
  }
  getAllStudentCourses(id: number) {
    const context = new HttpContext()

    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/students/courses/${id}`, { context })
  }
  createStudent(createStudent: StudentModel.Student) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.post(`admin/students`, createStudent, { context })
  }
  searchStudents(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/students/search?${query.asString()}`, { context })
  }
  updateStudent(id: number, updateStudent: StudentModel.Student) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.put(`admin/students/${id}`, updateStudent, { context })
  }

  updateStudentPassword(changePassword: StudentModel.ResetPassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.patch(`admin/students/reset-password`, changePassword, { context })
  }
  deleteOneStudent(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    console.log(this.httpClient.get<any>(`admin/students/${id}`, { context }));
    return this.httpClient.delete<any>(`admin/students/${id}`, { context })
  }

  //*               *******************Admin dashboard Course******************                 *

  createCourse(createcourse: CourseModel.Course) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.post(`admin/courses`, createcourse, { context })
  }
  getCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/courses?${query.asString()}`, { context })
  }
  removeCourseFromStudent(studentCourse: CourseModel.StudentCourse) {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.patch(`admin/courses/student?`, studentCourse, { context })
  }
  removeCourseFromInstructor(instructorCourse: CourseModel.InstructorCourse) {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.patch(`admin/courses/instructor?`, instructorCourse, { context })
  }
  getOneCourse(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`admin/courses/${id}`, { context })
  }
  searchCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/courses/search?${query.asString()}`, { context })
  }
  updateCourse(id: number, updatecourse: CourseModel.Course) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.put(`admin/courses/${id}`, updatecourse, { context })
  }
  deleteOneCourse(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.delete<any>(`admin/courses/${id}`, { context })

  }
  addInstructorToCourse(instructorCourse: InstructorModel.InstructorCourse) {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.post(`admin/courses/instructor`, instructorCourse, { context })
  }
  addStudentToCourse(studentCourse: CourseModel.StudentCourse) {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.post(`admin/courses/student`, studentCourse, { context })
  }

  //*               *******************Admin dashboard Instructor******************                 *

  createInstructor(createInstructor: InstructorModel.Instructor) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.post(`admin/instructors`, createInstructor, { context })
  }

  getInstructors(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/instructors?${query.asString()}`, { context })
  }

  getOneInstructor(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`admin/instructors/${id}`, { context })
  }

  searchInstructors(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/instructors/search?${query.asString()}`, { context })
  }

  updateInstructor(id: number, updateInstructor: InstructorModel.Instructor) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.put(`admin/instructors/${id}`, updateInstructor, { context })
  }

  resetInstructorPassword(resetPassword: InstructorModel.ResetPassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, { successMessage: 'Success' })
    return this.httpClient.patch(`admin/instructors/reset-password`, resetPassword, { context })
  }

  deleteOneInstructor(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.delete<any>(`admin/instructors/${id}`, { context })
  }

  getInstructorCourses(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`admin/instructors/courses/${id}`, { context })
  }

    //*               ******************* MEDIA ******************                 *

    uploadFile(file: File): Observable<any>{
      const context = new HttpContext()
      context.set(FULL_RESPONSE, true)
      const formData = new FormData();
      formData.append('file', file);

      return this.httpClient.post<Observable<any>>(`user/media`, formData, { context })
    }

    exportCourses(): Observable<any> {
      const context = new HttpContext()
      context.set(FULL_RESPONSE, true)
      return this.httpClient.get<any>(`admin/export/courses/`, { context })
    }

    exportStudents(): Observable<any> {
      const context = new HttpContext()
      context.set(FULL_RESPONSE, true)
      return this.httpClient.get<any>(`admin/export/students/`, { context })
    }

    exportInstructors(): Observable<any> {
      const context = new HttpContext()
      context.set(FULL_RESPONSE, true)
      return this.httpClient.get<any>(`admin/export/instructor/`, { context })
    }
}
