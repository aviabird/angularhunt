import { ResponseParserService } from './../services/response-parser.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ActionTypes, UserActions } from '../actions/user.actions';
import { AuthenticationService } from './../services/authentication.service';
import { Project } from '../models';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
    private userActions: UserActions,
    private authService: AuthenticationService,
    private parser: ResponseParserService
  ) { }

  @Effect() login$ = this.actions$
    .ofType(ActionTypes.LOGIN)
    .map((action: Action) => action.payload)
    .switchMap((provider: string) => this.authService.login(provider))
    .map((response: any) => response.json())
    .map((response) => {
        this.authService.storeTokenInLocalstorage(response);
        let user = this.parser.getUserObj(response);
        return this.userActions.loginSuccess(user);
    })

  @Effect() loadCurrentUserProfile$ = this.actions$
    .ofType(ActionTypes.LOAD_CURRENT_USER_PROFILE)
    .switchMap(() => this.authService.loadCurrentUserProfile())
    .map((response: any) => response.json())
    .map((response) => this.userActions.loadCurrentUserProfileSuccess(response.user))


  @Effect() logout$ = this.actions$
    .ofType(ActionTypes.LOGOUT)
    .map(() => this.authService.logout())
    .map(() => this.userActions.logoutSuccess());

}
