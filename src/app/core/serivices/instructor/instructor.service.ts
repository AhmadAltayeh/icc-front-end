import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from "@angular/common/http";
import { PaginationQuery, PaginationResult } from "../../models";
import { Observable } from "rxjs";
import { FULL_RESPONSE, SNACKBAR_OPTIONS } from "../../interceptors/teardown/http-context";
import { InstructorModel } from '../../models/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  constructor(private httpClient: HttpClient) {
  }

  getMyCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`instructor/instructors/my-courses?${query.asString()}`, { context })
  }

  getCourseDetails(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`instructor/instructors/courses/${id}`, { context })
  }

  getCourseStudents(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`instructor/instructors/course/students/${id}`, { context })
  }

  searchMyCourses(query: PaginationQuery): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`instructor/instructors/course/search?${query.asString()}`, { context })
  }

  getInstructorProfile(): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<any>(`instructor/instructors/profile`, { context })
  }

  updateInstructorProfile(updateProfile: InstructorModel.InstructorProfile): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.put<any>(`instructor/instructors/profile`, updateProfile, { context })
  }

  updateInstructorPassword(updatePassword: InstructorModel.ChangePassword): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.patch<any>(`instructor/instructors/password`, updatePassword, { context })
  }

  addCourseMaterial(material: InstructorModel.CreateMaterial): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.post<any>(`instructor/materials`, material, { context })
  }

  getCourseMaterial(id: number): Observable<PaginationResult<any>> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.get<PaginationResult<any>>(`instructor/materials/course/${id}`, { context })
  }

  updateMaterial(id: number, material: InstructorModel.UpdateMaterial): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.put<any>(`instructor/materials/${id}`, material, { context })
  }

  deleteMaterial(id: number): Observable<any> {
    const context = new HttpContext()
    context.set(FULL_RESPONSE, true)
    return this.httpClient.delete<any>(`instructor/materials/${id}`, { context })
  }
}
