import { User } from './../models/user';
import { type } from '../util';
import { Action } from '@ngrx/store';
import { Project } from '../models';

export const ActionTypes = {
  RETRIVE_PROJECTS:         type('Retrive Lists'),
  RETRIVE_PROJECTS_SUCCESS: type('Retrive Lists Success'),
  SELECT_PROJECT:           type('Select Project'),
  UPVOTE_PROJECT:           type('Upvote Project'),
  UPDATE_PROJECT_SUCCESS:   type('Update Project Success')
}

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

  selectProject(projectId: any): Action{
    return {
      type: ActionTypes.SELECT_PROJECT,
      payload: projectId
    };
  }

  upvoteProject(project: Project, user: User): Action{
    return {
      type: ActionTypes.UPVOTE_PROJECT,
      payload: {project: project, user: user}
    };
  }

  updateProjectSuccess(project: any): Action {
    return {
      type: ActionTypes.UPDATE_PROJECT_SUCCESS,
      payload: project
    }
  }
}
