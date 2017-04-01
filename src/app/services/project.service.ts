import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Jsonp } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2';
import { dummyData } from './../dummyData';


@Injectable()
export class ProjectService {
  userId = '5bc67e9ba994773e66c535640';
  listId = 'cf7d6ebd15';
  mailChimpUrl = 'https://aviabird.us15.list-manage.com/subscribe/post-json';
  baseUrl = 'http://localhost:3000/api';
  projectsCount = 0;

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
      .map(response => {
        return response.map(project => new Project(project));
      });
  }

	/**
	 * User Like/Dislikes Project
   * TODO: Needs Serious Refactoring....
   *       This should retrun the updated project.
   *       currenly only upvoting;
	 * @method upvoteProject
	 * @param object {project: any, user: any } of project
	 * @return { Observable } Observable with updated project object
	 */
  upvoteProject(payload: any) {
    let project = payload.project;
    let user =  payload.user;
    let newupvote = project.upvotes ? project.upvotes + 1 : 1;

    return this.db.list('/projects').update(project.$key,
                { upvotes: newupvote,
                  upvoted_by: { [user.$key]: user.email } });
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
