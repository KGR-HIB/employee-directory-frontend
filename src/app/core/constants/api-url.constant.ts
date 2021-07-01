import { environment } from '../../../environments/environment';

const BASE_PATH = `${environment.apiUrl}`;
//TODO: const BASE_PATH = `${environment.apiUrl}/v1`;

export const API_URLS = {
  LOGIN: '',
  EMPLOYEES: `${BASE_PATH}/employees`
}

export const CONTEXT_SERVICE = '/directoryServices';
export const API_URL = '/api/v1/'
export const REST_CONTROLLER = {
  CITY: 'cities',
  DEPARTMENT: 'departments',
  CERTIFICATION: 'certifications',
  PROJECT: 'projects',
  SKILL: 'skills',
  POSITION: 'positions'
};
