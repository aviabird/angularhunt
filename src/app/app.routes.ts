/**Required Angular 2 Modules for Router */
import { Routes, RouterModule } from '@angular/router';

/** Componets required for routing */
import { ProjectsPageComponent } from './container/projects-page/projects-page.component';
import { ProjectDetailPageComponent } from './container/project-detail-page/project-detail-page.component';
import { LoginPageComponent } from './container/login-page/login-page.component';

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
  { path: 'login', component: LoginPageComponent }

];

export const routing = RouterModule.forRoot(routes);
