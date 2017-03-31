import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, Jsonp } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2';
import { dummyData } from './../dummyData';


@Injectable()
export class ProjectService {
  userId = '5bc67e9ba994773e66c535640';
  listId = 'cf7d6ebd15';
  mailChimpUrl = 'https://aviabird.us15.list-manage.com/subscribe/post-json';
  baseUrl = 'http://localhost:3000/api';
  projectsCount: number = 0;

  constructor(private http: Http,
              private jsonp: Jsonp,
              public db: AngularFireDatabase) { }

  sendData() {
    dummyData.forEach(project => {
      this.db.list('/projects').push(project);
    });
  }


  getAllProjects(): Observable<any> {
    this.projectsCount += 5;
    return this.db.list('/projects', {
        query: {
          limitToFirst: this.projectsCount,
        }
      })
      .map(response => response.map(project => new Project(project)));
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
      // .catch((res: any) => {
      //   console.log('Some Error Occured', res);
      //   return res;
      // });
  }

  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }

  subscribeToNewsLetter(email: string)  {
    const url = `${this.mailChimpUrl}?u=${this.userId}&id=${this.listId}&subscribe=Subscribe&EMAIL=${email}&c=JSONP_CALLBACK`;
    return this.jsonp.request(url, { method: 'Get' })
               .map(res => res.json());
  }
}
