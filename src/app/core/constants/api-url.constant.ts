import { environment } from '../../../environments/environment';

const BASE_PATH = `${environment.apiUrl}`;
//TODO: const BASE_PATH = `${environment.apiUrl}/v1`;

export const CONTEXT_SERVICE = '/directoryServices';
export const API_URL = '/api/v1/'

export const API_URLS = {
  LOGIN: `${BASE_PATH}${CONTEXT_SERVICE}${API_URL}auth/login`,
  EMPLOYEES: `${BASE_PATH}${CONTEXT_SERVICE}${API_URL}/employees`
}


export const REST_CONTROLLER = {
  LOGIN: 'auth/login',
  CITY: 'cities',
  DEPARTMENT: 'departments',
  CERTIFICATION: 'certifications',
  PROJECT: 'projects',
  SKILL: 'skills',
  POSITION: 'positions'
};
