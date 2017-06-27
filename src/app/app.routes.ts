import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
/**Required Angular 2 Modules for Router */
import { Routes, RouterModule } from '@angular/router';
/** Componets required for routing */
import { ProjectsPageComponent } from './container/projects-page/projects-page.component';
import { ProjectDetailPageComponent } from './container/project-detail-page/project-detail-page.component';
import { LoginPageComponent } from './container/login-page/login-page.component';
import { AdminPageComponent } from './container/admin-page/admin-page.component';

/**AuthGuard */
import { CanActivateViaAuthGuard } from './guards/auth.guards';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: ProjectsPageComponent
      },
      {
        path: ':id',
        component: ProjectDetailPageComponent
      }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminPageComponent,
    canActivate: [ CanActivateViaAuthGuard ],
    children: [
      { path: '', redirectTo: 'new-project', pathMatch: 'full' },
      { path: 'new-project', component: ProjectEditComponent },
      { path: 'edit/:id', component: ProjectEditComponent },
      { path: 'all-projects', component: AllProjectsComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
 