import { ResponseParserService } from './services/response-parser.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap';

/**Satellizer */
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { MyAuthConfig } from './auth-config';

/**NgRx Store */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RouterStoreModule } from '@ngrx/router-store';

/**Services */
import { ProjectService } from './services/project.service';
import { AuthenticationService } from './services/authentication.service';

/** All SideEffects in APP */
import { ProjectEffects } from './effects/project.effects';
import { UserEffects } from './effects/user.effects';

/**Global Reducer of APP */
import reducer from './reducers';

/**ALL Ngrx Actions that can be fired in app loaded as one.*/
import actions from './actions';

/**All Routes in APP */
import { routing } from './app.routes';


import { AppComponent } from './container/app.component';
import { ProjectsPageComponent } from './container/projects-page/projects-page.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailPageComponent } from './container/project-detail-page/project-detail-page.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProjectComponent } from './components/project/project.component';
import { NewsletterCardComponent } from './components/newsletter-card/newsletter-card.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ModalComponent } from './components/shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsPageComponent,
    ProjectCardComponent,
    ProjectDetailPageComponent,
    HeaderComponent,
    ProjectComponent,
    NewsletterCardComponent,
    NavigationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    routing,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    ModalModule.forRoot(),
    EffectsModule.run(ProjectEffects),
    EffectsModule.run(UserEffects),
  ],
  providers: [
    actions,
    ProjectService,
    AuthenticationService,
    ResponseParserService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
