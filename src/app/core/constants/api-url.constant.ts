import { environment } from '../../../environments/environment';

const BASE_PATH = `${environment.apiUrl}`;
//TODO:
export const MOCKED_PATH = `http://localhost:3000/employees`;

export const CONTEXT_SERVICE = `/directoryServices`;
export const API_URL = '/api/v1/'

export const API_URLS = {
  LOGIN: `${BASE_PATH}${CONTEXT_SERVICE}${API_URL}auth/login`,
}

export const REST_CONTROLLER = {
  LOGIN: 'auth/login',
  CITY: 'cities',
  DEPARTMENT: 'departments',
  CERTIFICATION: 'certifications',
  PROJECT: 'projects',
  SKILL: 'skills',
  POSITION: 'positions',
  EMPLOYEE: 'employees',
};

export const EMPLOYEE_PATHS = {
  PAGE: '/page'
};
