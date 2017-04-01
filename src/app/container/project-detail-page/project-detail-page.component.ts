import { Project } from './../../models/project';
import { User } from './../../models/user';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AppState, getSelectedProject, getCurrentUser } from '../../reducers/index';
import { ProjectActions } from '../../actions/project.actions';

@Component({
  selector: 'app-project-detail-page',
  templateUrl: './project-detail-page.component.html',
  styleUrls: ['./project-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailPageComponent implements OnInit, OnDestroy, AfterViewInit {
  actionsSubscription: Subscription;
  project$: Observable<any>;
  projectId: string;
  user: User;

  constructor(private projectActions: ProjectActions,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
    this.project$ = this.store.select(getSelectedProject);

    this.store.select(getCurrentUser)
      .subscribe((user: User) => this.user = user);
  }

  ngOnInit() {
    this.actionsSubscription = this.route.params.subscribe(
      (params: any) => {
        this.projectId = params['id'];
        this.store.dispatch(this.projectActions.selectProject(this.projectId));
      }
    );
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  toggleUpvote(project: Project) {
    if (this.user) {
      this.store.dispatch(this.projectActions.upvoteProject(project, this.user));
    } else {
      alert('You are not LoggedIn! Please Login');
    }

  }
}
