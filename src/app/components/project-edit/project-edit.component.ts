import { Project } from './../../models/project';
import { AppState, getSelectedProject } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyNotifierService } from './../../services/toasty-notifier.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlValidator } from './../../Validators/url';
import { ProjectService } from './../../services/project.service';
import { Subscription } from 'rxjs/Subscription';
import { ProjectActions } from '../../actions/project.actions';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  projectForm: FormGroup;
  formSubmit: Boolean = false;
  projectId: string;
  project$: Observable<any>;
  isNewProject: boolean;
  project: Project = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private projectActions: ProjectActions,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toasterService: ToastyNotifierService) {

    this.project$ = this.store.select(getSelectedProject);
    this.isNewProject = this.checkIfNewProject();

    if (!this.isNewProject) {
      this.project$.subscribe(project => this.project = project);
      this.actionsSubscription = this.route.params.subscribe(
        (params: any) => {
          this.projectId = params['id'];
          this.store.dispatch(this.projectActions.selectProject(this.projectId));
        }
      );

    }
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    if (this.isNewProject) {
      this.projectForm = this.initNewProjectForm();
    } else {
      this.projectForm = this.initExistingProjectForm();
    };
  }


  private checkIfNewProject() {
    return (this.router.url === '/admin/new-project') ? true : false;
  }


  initExistingProjectForm() {
    return this.fb.group({
      'name': [this.project.name, Validators.required],
      'git_url': [this.project.git_url, Validators.compose([Validators.required, UrlValidator])],
      'description': [this.project.description, Validators.required],
      'demo_url': [this.project.demo_url, Validators.compose([Validators.required, UrlValidator])],
      'image_url': [this.project.image_url, Validators.required],
      'author_name': [this.project.author_name, Validators.required],
      'caption': [this.project.caption],
      'twitter_id': [this.project.twitter_id],
      'approved': [true],
      'created_at': [new Date().toString()],
      'upvotes': [this.project.upvotes]
    });
  }

  initNewProjectForm() {
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

    if (this.isNewProject) {
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
    } else {
      this.projectService.updateProject(this.project.$key, this.projectForm.value).then(() => {
        this.toasterService
          .pop({ result: 'success', msg: 'Your Project is Successfully Updated' });
        return;
      },
        (err: Error) => {
          return this.toasterService
            .pop({ result: 'error', msg: err.message });
        });
    }

  }

  ngOnDestroy() {
  }

}
