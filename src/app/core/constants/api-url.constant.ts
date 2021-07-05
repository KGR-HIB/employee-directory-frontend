import { environment } from '../../../environments/environment';

const BASE_PATH = `${environment.apiUrl}`;

export const CONTEXT_SERVICE = `/directoryServices`;
export const API_URL = '/api/v1/'

export const API_URLS = {
  LOGIN: `${BASE_PATH}${CONTEXT_SERVICE}${API_URL}auth/login`,
  LOGOUT: `${BASE_PATH}${CONTEXT_SERVICE}${API_URL}auth/logout`,
}

export const REST_CONTROLLER = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  CITY: 'cities',
  DEPARTMENT: 'departments',
  CERTIFICATION: 'certifications',
  PROJECT: 'projects',
  SKILL: 'skills',
  POSITION: 'positions',
  EMPLOYEE: 'employees',
};

export const EMPLOYEE_PATHS = {
  PAGE: '/page',
  UPDATE_PROJECTS: '/projects/add',
  UPDATE_CERTIFICATIONS: '/certifications/add',
  UPDATE_SKILLS: '/skills/add'
};
