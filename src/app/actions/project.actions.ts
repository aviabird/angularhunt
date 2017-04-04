import { User } from './../models/user';
import { type } from '../util';
import { Action } from '@ngrx/store';
import { Project } from '../models';

export const ActionTypes = {
  RETRIVE_PROJECTS:         type('Retrive Lists'),
  RETRIVE_PROJECTS_SUCCESS: type('Retrive Lists Success'),
  SELECT_PROJECT:           type('Select Project'),
  TOGGLE_UPVOTE:            type('Toggle Upvote'),
  UPDATE_PROJECT_SUCCESS:   type('Update Project Success'),
  TOGGLE_UPVOTE_SUCCESS:    type('Toggle Upvote Success')
};

export class ProjectActions {

  retriveProjects(): Action {
    return {
      type: ActionTypes.RETRIVE_PROJECTS
    }
  }

  retriveProjectsSuccess(projects: Project[]): Action {
    return {
      type: ActionTypes.RETRIVE_PROJECTS_SUCCESS,
      payload: projects
    }
  }

  selectProject(projectId: any): Action {
    return {
      type: ActionTypes.SELECT_PROJECT,
      payload: projectId
    };
  }

  toggleUpvote(project: Project, action: string, user: User): Action {
    return {
      type: ActionTypes.TOGGLE_UPVOTE,
      payload: {project: project, action: action, user: user}
    };
  }

  /**Temp Action for deployment will be replaced by
   * updateProjectSuccess
   */
  toggleUpvoteSuccess(): Action {
    return {
      type: ActionTypes.TOGGLE_UPVOTE_SUCCESS
    };
  }

  updateProjectSuccess(project: any): Action {
    return {
      type: ActionTypes.UPDATE_PROJECT_SUCCESS,
      payload: project
    };
  }
}
