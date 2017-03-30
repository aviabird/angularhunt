import { ResponseParserService } from './../services/response-parser.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { ActionTypes, UserActions } from '../actions/user.actions';
import { AuthenticationService } from './../services/authentication.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class UserEffects {

  @Effect() login$ = this.actions$
    .ofType(ActionTypes.LOGIN)
    .map((action: Action) => action.payload)
    .switchMap((provider: string) => this.authService.login(provider))
    .filter((payload) => payload.user != null)
    .switchMap(payload => this.authService.storeNewUser(payload))
    .map((payload) => this.userActions.loginSuccess(payload));


  @Effect() loadCurrentUserProfile$ = this.actions$
    .ofType(ActionTypes.LOAD_CURRENT_USER_PROFILE)
    .switchMap(() => this.authService.authStatus())
    .filter((payload) => payload.user != null)
    .switchMap((payload) => this.authService.updateUserAuth(payload))
    .map((response) => {
      return this.userActions.loadCurrentUserProfileSuccess(response.user);
    });


  @Effect() logout$ = this.actions$
    .ofType(ActionTypes.LOGOUT)
    .map(() => this.authService.logout())
    .map(() => this.userActions.logoutSuccess());


  constructor(private actions$: Actions,
    private userActions: UserActions,
    private authService: AuthenticationService,
    private parser: ResponseParserService,
    private store: Store<AppState>
  ) { }

}
