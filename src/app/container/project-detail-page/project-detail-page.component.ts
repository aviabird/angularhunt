import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AppState, getSelectedProject } from '../../reducers/index';
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

  constructor(private projectActions: ProjectActions,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
    this.project$ = this.store.select(getSelectedProject);
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

  toggleUpvote(id: string) {
    this.store.dispatch(this.projectActions.upvoteProject(id));
  }
}
