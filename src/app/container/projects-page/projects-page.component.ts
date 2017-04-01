import { User } from './../../models/user';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getProjects, getCurrentUser } from '../../reducers/index';
import { ProjectActions } from '../../actions/project.actions';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent implements OnInit {
  projects$: Observable<any>;
  user: User = null;

  constructor(private projectsService: ProjectService,
    private projectActions: ProjectActions,
    private store: Store<AppState>) {
    this.projects$ = this.store.select(getProjects);
    this.store.select(getCurrentUser)
      .subscribe((user: User) => this.user = user);
  }

  ngOnInit() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }

  toggleUpvote(project: Project) {
    if (this.user === null) {
      this.store.dispatch(this.projectActions.upvoteProject(project, this.user));
    }else {
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
