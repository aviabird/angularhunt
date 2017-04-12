import { ToastyNotifierService } from './../../services/toasty-notifier.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from './../../Validators/url';
import { ProjectService } from './../../services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  projectForm: FormGroup;
  formSubmit: Boolean = false;
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toasterService: ToastyNotifierService) {
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
      'created_at': [new Date().toString()],
      'upvotes': [0]
    });
  }

  onSubmit() {
    this.formSubmit = true;
    this.projectService.saveNewProject(this.projectForm.value).then(() => {
      this.toasterService
        .pop({ result: 'success', msg: 'Your Project is Successfully Saved' });

      this.projectForm.reset();
      return;
    },
      (err: Error) => {
        return this.toasterService
          .pop({ result: 'error', msg: err.message });
      });
  }
}
