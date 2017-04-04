import { User } from './../../models/user';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  AppState,
  getProjects,
  getCurrentUser,
  getProjectsIds,
  getUpvotedProjectIds
} from '../../reducers/index';
import { ProjectActions } from '../../actions/project.actions';
import { UserActions } from './../../actions/user.actions';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent implements OnInit {
  projects$: Observable<any>;
  user: User;
  projectIds: Observable<any>;
  upvotedProjectIds$: Observable<any>;

  constructor(private projectsService: ProjectService,
    private projectActions: ProjectActions,
    private userActions: UserActions,
    private store: Store<AppState>) {

    this.projects$ = this.store.select(getProjects);

    this.projectIds = this.store.select(getProjectsIds);

    this.upvotedProjectIds$ = this.store.select(getUpvotedProjectIds);

    this.store.select(getCurrentUser)
      .subscribe((user: User) => {
        this.user = user;
        if (this.user) {
          this.projectIds.subscribe((ids: string[]) => {
            this.store.dispatch(this.userActions.loadUpvotedProjectIds(
              { userId: this.user.$key, projectIds: ids }
            ));
          });
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }

  toggleUpvote(payload: {project: Project, action: string }) {
    if (this.user) {
      this.store
        .dispatch(this.projectActions
          .toggleUpvote(payload.project, payload.action, this.user));
    } else {
      alert('You are not loggedIn! Please Login');
    }
  }

  /**TODO: Replace alert with toasty */
  subscribeToNewsLetter(email: string) {
    this.projectsService.subscribeToNewsLetter(email)
      .subscribe((res) => {
        alert(res.msg);
      });
  }

  loadMoreProjects() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }
}
