import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {PaginationQuery, PaginationResult} from "../../models";
import {Observable} from "rxjs";
import {AdminModel} from "../../models/admin.model";
import {FULL_RESPONSE, SNACKBAR_OPTIONS} from "../../interceptors/teardown/http-context";
import { CourseModel } from '../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpClient: HttpClient) {
  }

  getAdmins(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/admins?${query.asString()}`, {context})
  }
  getAdminProfile():Observable<any>{
    const context = new HttpContext()
    context.set(FULL_RESPONSE,true)
    return this.httpClient.get<any>(`admin/admins/profile`, {context})

  }

  getRoles(): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`admin/admins/roles/admin`, {context})
  }

  searchAdmins(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/admins/search?${query.asString()}`, {context})
  }

  createAdmin(createAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.post(`admin/admins`, createAdmin, {context})
  }

  updateAdmin(id: number, updateAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.put(`admin/admins/${id}`, updateAdmin, {context})
  }

  updateAdminPassword(changePassword: AdminModel.changePassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.patch(`admin/admins/update-password`, changePassword, {context})
  }
 restAdminPassword(resetPassword: AdminModel.ResetPassword) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.patch(`admin/admins/reset-password`, resetPassword, {context})
  }

  getOneAdmin(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    console.log(this.httpClient.get<any>(`admin/admins/${id}`, {context}));
    return this.httpClient.get<any>(`admin/admins/${id}`, {context})
  }
  deleteOneAdmin(id:number):Observable<any>{
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    console.log(this.httpClient.get<any>(`admin/admins/${id}`, {context}));
    return this.httpClient.delete<any>(`admin/admins/${id}`, {context})
    
  }

//*               *******************Admin dashboard student******************                 *
    getStudents(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/students?${query.asString()}`, {context})
  }
    getOneStudent(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`admin/students/${id}`, {context})
  }
  searchStudents(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/students/search?${query.asString()}`, {context})
  }


  //*               *******************Admin dashboard Course******************                 *
  createCourse(createcourse: CourseModel.Course) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.post(`admin/courses`, createcourse, {context})
  }
  getCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/courses?${query.asString()}`, {context})
  }
  getOneCourse(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`admin/courses/${id}`, {context})
  }
  searchCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/courses/search?${query.asString()}`, {context})
  }
  updateCourse(id: number, updatecourse: CourseModel.Course) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.put(`admin/courses/${id}`, updatecourse, {context})
  }
  //*               *******************Admin dashboard Instructor******************                 *
  getInstructors(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/instructors?${query.asString()}`, {context})
  }
  getOneInstructor(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    //console.log(this.httpClient.get<any>(`admin/students/${id}`, {context}));
    return this.httpClient.get<any>(`admin/instructors/${id}`, {context})
  }
  searchInstructors(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`admin/instructors/search?${query.asString()}`, {context})
  }

}
