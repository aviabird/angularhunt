import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  projectForm: FormGroup;
  formSubmit: Boolean = false;
  constructor(private fb: FormBuilder) {
    this.projectForm = this.initProjectForm();
   }

  ngOnInit() {
  }

  initProjectForm() {
    return this.fb.group({
      'name': ['', Validators.required],
      'git_url': [''],
      'description': ['', Validators.required],
      'demo_url': [''],
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
