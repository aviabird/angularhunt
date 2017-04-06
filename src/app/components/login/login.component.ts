import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { UserActions } from './../../actions/user.actions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userActions: UserActions, 
              private store: Store<AppState>) { }

  ngOnInit() {
  }

  login(provider: string) {
    this.store.dispatch(this.userActions.login(provider));
  }

}
