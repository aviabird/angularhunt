import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from './../models/user';
import {
  AngularFire, AngularFireDatabase, AuthProviders
} from 'angularfire2';

@Injectable()
export class AuthenticationService {
  baseUrl = environment.API_ENDPOINT;
  userAuth: Observable<any>;

  constructor(private af: AngularFire,
    public db: AngularFireDatabase,
    private http: Http) {

    this.userAuth = this.af.auth.map(
      user => this._changeState(user),
      error => console.log(error),
    );
  }

  login(provider: string): Observable<any> {
    this.af.auth.login({
      provider: this._getProvider(provider)
    });
    return this.userAuth;
  }

  logout(): any {
    this.af.auth.logout();
    localStorage.removeItem('access_token')
    return this.userAuth;
  }

  storeNewUser(userAuth) {
    let user = userAuth.user;

    return this.findbyUID(user.uid).map(
      obj => {
        if (!obj.$value) {
          this.db
            .object(`users/${user.uid}`)
            .set(user)
            .then(() => console.log('New User Added to DB'))
            .catch(() => console.clear());
        }
        return this.updateUserAuth(userAuth);
      }
    )
      .switchMap(_userAuth => _userAuth)
  }

  findbyUID(uid: string) {
    return this.db.object(`users/${uid}`)
  }

  updateUserAuth(userAuth) {
    let user = userAuth.user;

    return this.findbyUID(user.uid).map(
      user => {
        return Object.assign({}, userAuth, {
          user: new User(user)
        });
      }
    );
  }

  authStatus() {
    return this.userAuth;
  }

  private _changeState(user: any = null) {
    if (user) {
      return {
        user: this._getUserInfo(user),
        isAuthenticated: true
      };
    } else {
      return {
        user: null,
        isAuthenticated: false
      };
    }
  }

  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      uid: user.auth.uid
    };
  }

  private _getProvider(from: string) {
    switch (from) {
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}
