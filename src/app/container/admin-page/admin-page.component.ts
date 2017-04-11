import { UserActions } from './../../actions/user.actions';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from './../../Validators/url';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  projectForm: FormGroup;
  formSubmit: Boolean = false;
  constructor(
    private userActions: UserActions,
    private store: Store<AppState>,
    private fb: FormBuilder) {

    this.projectForm = this.initProjectForm();

   }

  ngOnInit() {
  }

  initProjectForm() {
    return this.fb.group({
      'name': ['', Validators.required],
      'git_url': ['', Validators.compose([Validators.required, UrlValidator])],
      'description': ['', Validators.required],
      'demo_url': ['', Validators.compose([Validators.required, UrlValidator])],
      'image_url': ['', Validators.required],
      'author_name': ['', Validators.required],
      'caption': [''],
      'twitter_id': [''],
      'approved': [true],
      'created_at': [new Date()],
      'upvotes': [0]
    });
  }

  onSubmit() {
    this.formSubmit = true;
    console.log("Hello",this.projectForm.value);
  }

}
