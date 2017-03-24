import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ProjectService {
  baseUrl = 'http://localhost:3000/api'
  constructor(private http: Http) { }

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/all_projects`)
      .map(response => response.json());
  }

	/**
	 * User Like/Dislikes Project
   * TODO: Needs Serious Refactoring.... 
	 * @method upvoteProject
	 * @param {string} projectId of project
	 * @return {Observable} Observable with updated project object
	 */
  upvoteProject(projectId: string): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getAccessTokenToken()
    });
    return this.http.post(`${this.baseUrl}/projects/upvote`, { id: projectId }, { headers: headers })
      .map((data: Response) => data.json())
      .catch((res: any) => {
        console.log('Some Error Occured', res);
        return res;
      });
  }

  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }

  subscribeToNewsLetter(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects/subscribe_to_newsletter`,
      { email: email })
      .map((data: Response) => data.json())
      .catch((res: any) => {
        console.log('Some Error Occured', res);
        return res;
      });
  }
}
