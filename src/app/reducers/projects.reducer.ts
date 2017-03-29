import { Action } from '@ngrx/store';
import { Project } from '../models/';
import { ActionTypes } from '../actions/project.actions';

export type State = {
  ids: string[];
  entities: { [id: string]: Project };
  selectedProjectId: string;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedProjectId: null
};

export const projectReducer = (state = initialState, action: Action): State  => {
  switch (action.type) {
    case ActionTypes.RETRIVE_PROJECTS_SUCCESS: {
      const Projects: Project[] = action.payload;

      const newProjects: Project[] = Projects;

      const newProjectsIds = Projects
        .filter(list => !state.entities[list.id])
        .map(list => list.id);

      const newEntities = newProjects
        .reduce((entities: { [id: string]: Project }, project: Project) => {
          return Object.assign(entities, {
            [project.id]: project
          });
        }, {});

      return Object.assign({}, state, {
        ids: [...state.ids, ...newProjectsIds],
        entities: Object.assign({}, state.entities, newEntities)
      });
    };

    case ActionTypes.SELECT_PROJECT: {
      return Object.assign({}, state, {
        selectedProjectId: action.payload
      });
    };


    case ActionTypes.UPDATE_PROJECT_SUCCESS: {
      const updatedProject = action.payload;
      const updatedProjectId = updatedProject.id

      let newProjects = state.entities;
      newProjects[updatedProjectId] = updatedProject;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, newProjects)

      });
    };

    default: {
      return state;
    };
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedProjectId = (state: State) => state.selectedProjectId;
