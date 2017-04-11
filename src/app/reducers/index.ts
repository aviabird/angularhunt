import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromProjects from './projects.reducer';
import * as fromUsers from './user.reducer';
import * as fromTopics from './topic.reducer';

// Entire State of a App
export interface AppState {
    projects: fromProjects.State;
    users:    fromUsers.State;
    topics:   fromTopics.State;
}

// Export all the reducers
export default compose(combineReducers)({
    projects:  fromProjects.projectReducer,
    users:     fromUsers.userReducer,
    topics:    fromTopics.topicReducer
});



/**Retrive Projects from ProjectState */
export const getProjectsState = (appState: AppState) => appState.projects;
export const getProjectsEntities = createSelector(getProjectsState, fromProjects.getEntities);
export const getProjectsIds = createSelector(getProjectsState, fromProjects.getIds);
export const getProjects = createSelector(getProjectsEntities, getProjectsIds, (projects, ids) => {
  return ids.map(id => projects[id]);
});

export const getSelectedProjectId = createSelector(getProjectsState, fromProjects.getSelectedProjectId);
export const getSelectedProject = createSelector(getProjectsEntities, getSelectedProjectId, (projects, id) => {
  return projects[id];
});


/**Retrive Users */
export const getUsersState = (appState: AppState) => appState.users;

export const getCurrentUser = createSelector(getUsersState, fromUsers.getUser);
export const getUpvotedProjectIds = createSelector(getUsersState, fromUsers.getUpvotedProjectIds);
export const getUserAuthStatus = createSelector(getUsersState, fromUsers.getAuthStatus);

/** Retrive Topics */
export const getTopicsState = (appState: AppState ) => appState.topics;
export const getTopicsIds = createSelector(getTopicsState, fromTopics.getIds);
export const getTopicsEntities = createSelector(getTopicsState, fromTopics.getEntities);
export const getTopics = createSelector(getTopicsEntities, getTopicsIds, (topics, ids) => {
  return ids.map(id => topics[id]);
});
