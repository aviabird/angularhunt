import { TopicActions, ActionTypes } from './../actions/topic.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ProjectService } from './../services/project.service';
import { Topic } from './../models/topic';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicEffects {

  @Effect() getAllTopics$ = this.actions$
    .ofType(ActionTypes.LOAD_TOPICS)
    .switchMap(() => this.projectService.getAllTopics())
    .map((response: Topic[]) => this.topicActions.loadTopicsSuccess(response));

  constructor(private actions$: Actions,
    private topicActions: TopicActions,
    private projectService: ProjectService
  ) { }

}
