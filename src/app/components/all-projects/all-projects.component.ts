import { Component, OnInit } from '@angular/core';
import { Project } from './../../models/project';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  AppState,
  getProjects
} from '../../reducers/index';
import { ProjectActions } from '../../actions/project.actions';
import { ToastyNotifierService } from './../../services/toasty-notifier.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: Project[] = null;
  searchQuery = '';

  constructor(
    private projectActions: ProjectActions,
    private store: Store<AppState>,
    private toasterService: ToastyNotifierService) {
      this.store.select(getProjects)
        .subscribe(projects => this.projects = projects);
    }

  ngOnInit() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }


  loadMoreProjects() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }
}
