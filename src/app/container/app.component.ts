import { TopicActions } from './../actions/topic.actions';
import { getTopics } from './../reducers/index';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getCurrentUser } from '../reducers/index';
import { UserActions } from '../actions/user.actions';
import { User } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title: string;
  user$: Observable<User>;
  topics$: Observable<any>;
  loginModalHidden: Boolean = true;

  constructor(private userActions: UserActions,
    private topicActions: TopicActions,
    private store: Store<AppState>,
    private router: Router) {

    this.store.dispatch(this.userActions.loadCurrentUserProfile());
    this.store.dispatch(this.topicActions.loadTopics());

    this.user$ = this.store.select(getCurrentUser);
    this.topics$ = this.store.select(getTopics);
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  ngOnInit() {
  }

  getAccessTokenToken(): any {
    return localStorage.getItem('access_token');
  }
}
