import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {PaginationQuery, PaginationResult} from "../../models";
import {Observable} from "rxjs";
import {AdminModel} from "../../models/admin.model";
import {FULL_RESPONSE, SNACKBAR_OPTIONS} from "../../interceptors/teardown/http-context";

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

  createAdmin(createAdmin: AdminModel.Admin) {
    const context = new HttpContext()
    context.set(SNACKBAR_OPTIONS, {successMessage: 'Success'})
    return this.httpClient.post(`admin/admins`, createAdmin, {context})
  }
}
