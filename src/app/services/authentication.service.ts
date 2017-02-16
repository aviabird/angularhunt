import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
@Injectable()
export class AuthenticationService {
  baseUrl = "http://localhost:3000/api/";
  constructor(private auth: AuthService, private http: Http) {
   
  }

  login(provider: string): Observable<any> {
    return this.auth.authenticate(provider)
  }

  logout(): any {
    localStorage.removeItem('access_token');
  }

  storeTokenInLocalstorage(response: any): void {
    localStorage.setItem('access_token', response.token);
  }

  loadCurrentUserProfile(): Observable<any> {
    let token = this.getAccessTokenToken()
    let headers = new Headers({'Authorization': token})
    return this.http.post(`${this.baseUrl}/users/user_detail`, {},{ headers: headers })
  }

  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }

}
