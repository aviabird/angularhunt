import { Router, ActivatedRoute } from '@angular/router';
import { AppState, getUserAuthStatus } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  returnUrl: String = '/home';
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
  }


  redirectIfUserLoggedIn() {
    this.store.select(getUserAuthStatus).subscribe(
      data => {
        if (data === true) { this.router.navigate([this.returnUrl]); }
      }
    );
  }
}
