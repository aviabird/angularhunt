import { Topic } from './../models/topic';
import { User } from './../models/user';
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
  projectsCount = 0;

  constructor(private http: Http,
    private jsonp: Jsonp,
    public db: AngularFireDatabase) { }


  getAllTopics(): Observable<any> {
  return this.db.list('/topics')
             .map(response => response.map(topic => new Topic(topic)));
  }

  sendData() {
    dummyData.forEach(project => {
      this.db.list('/topics').push(project);
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
  toggleUpvote(payload: any): firebase.Promise<any> {
    console.log('payload', payload.action);
    let project: Project = payload.project;
    let user: User = payload.user;
    let action: string = payload.action;

    if (action === 'upvote') {
      return this.upvote(project, user);
    } else {
      return this.removeVote(project, user);
    }
  }

  upvote(project, user): firebase.Promise<any> {
    let newupvote = project.upvotes ? project.upvotes + 1 : 1;
    let user_projects = { user_id: user.$key, project_id: project.$key }
    let customKey = `${user.$key}_${project.$key}`;

    return this.db.list('/projects').update(project.$key,
      { upvotes: newupvote }).then(() => {
        let toSend = this.db.object(`/users_projects`);
        toSend.update({[customKey]: user_projects });
      });
  }


  removeVote(project, user): firebase.Promise<any> {
    let key = `${user.id}_${project.id}`;

    let newUpvote = project.upvotes - 1;

    return this.db.list('/projects').update(project.$key, {
       upvotes: newUpvote }).then(() => {
        this.db.list('/users_projects').remove(key);
      });
  }





  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }

  subscribeToNewsLetter(email: string) {
    const url = `${this.mailChimpUrl}?u=${this.userId}&id=${this.listId}&subscribe=Subscribe&EMAIL=${email}&c=JSONP_CALLBACK`;
    return this.jsonp.request(url, { method: 'Get' })
      .map(res => res.json());
  }


  loadUpvotedrojectIds(payload: any): Observable<any> {
    let userId = payload.userId;
    let projectIds = payload.projectIds;

    return this.db.list('/users_projects', {
      query: {
        orderByChild: 'user_id',
        equalTo: userId
      }
    }).map((users_projects: any) => users_projects.map(u_p => {
      return projectIds.indexOf(u_p.project_id) !== -1 ? u_p.project_id : null;
    }));
  };

  saveNewProject(project: any): firebase.Promise<any> {
    return this.db.list('/projects').push(project);
  }
}
