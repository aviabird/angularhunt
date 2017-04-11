import { Subscription } from 'rxjs/Rx';
// import { TripsService } from './../services/trips.service';
// import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate, OnDestroy {
  isAuthenticated: boolean;
  subscription: Subscription;
  user: User;
  validateEmailPattern: RegExp = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@aviabird.com/;

  constructor(private store: Store<fromRoot.AppState>, private router: Router) {
  }

  canActivate() {
    this.subscription = this.store
      .select(fromRoot.getCurrentUser)
      .subscribe(user => {
        this.user = user;
        if (!this.user || !this.validateEmailPattern.test(this.user.email)) {
          this.router.navigate(['/login']);
        }
      });

    return true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
