import { ProjectActions, ActionTypes } from './../actions/project.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProjectService } from './../services/project.service';
import { Project } from '../models';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions,
    private projectActions: ProjectActions,
    private projectService: ProjectService
  ) { }

  @Effect() getAllProjects$ = this.actions$
    .ofType(ActionTypes.RETRIVE_PROJECTS)
    .switchMap(() => this.projectService.getAllProjects())
    .map((response: any) => this.projectActions.retriveProjectsSuccess(response));

  @Effect() upvoteProject$ = this.actions$
    .ofType(ActionTypes.UPVOTE_PROJECT)
    .map((action: Action) => action.payload)
    .switchMap((projectId: string) => this.projectService.upvoteProject(projectId))
    .map((data) => this.projectActions.updateProjectSuccess(data));    
}
