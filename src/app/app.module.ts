import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap';
import {ShareButtonsModule} from 'ng2-sharebuttons';

/**NgRx Store */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/**Services */
import { ProjectService } from './services/project.service';
import { AuthenticationService } from './services/authentication.service';
import { ResponseParserService } from './services/response-parser.service';

/** All SideEffects in APP */
import { ProjectEffects } from './effects/project.effects';
import { UserEffects } from './effects/user.effects';

/**Global Reducer of APP */
import reducer from './reducers';

/**All Routes in APP */
import { routing } from './app.routes';

/**Actions */
import { ProjectActions } from './actions/project.actions';
import { UserActions } from './actions/user.actions';

/**AngularFire */
import { AngularFireModule, AuthMethods } from 'angularfire2';
import { secretKeys } from './secrets';

// Must export the config
export const firebaseConfig = {
  apiKey: secretKeys.FIREBASE_API_KEY,
  authDomain: 'angularhunt-89db2.firebaseapp.com',
  databaseURL: 'https://angularhunt-89db2.firebaseio.com',
  storageBucket: 'angularhunt-89db2.appspot.com',
  messagingSenderId: '281473446041'
};

/**All Components */
import { AppComponent } from './container/app.component';
import { ProjectsPageComponent } from './container/projects-page/projects-page.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailPageComponent } from './container/project-detail-page/project-detail-page.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProjectComponent } from './components/project/project.component';
import { NewsletterCardComponent } from './components/newsletter-card/newsletter-card.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { IsUpvotedByCurrentUserPipe } from './pipes/is-upvoted-by-current-user.pipe';

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
    ModalComponent,
    IsUpvotedByCurrentUserPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    StoreModule.provideStore(reducer),
    ModalModule.forRoot(),
    ShareButtonsModule.forRoot(),
    EffectsModule.run(ProjectEffects),
    EffectsModule.run(UserEffects),
    AngularFireModule.initializeApp(firebaseConfig, {
      method: AuthMethods.Popup
    })
  ],
  providers: [
    UserActions,
    ProjectActions,
    ProjectService,
    AuthenticationService,
    ResponseParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
