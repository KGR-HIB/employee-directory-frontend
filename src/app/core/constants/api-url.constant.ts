import { environment } from '../../../environments/environment';

const BASE_PATH = `${environment.apiUrl}`;
//TODO: const BASE_PATH = `${environment.apiUrl}/v1`;

export const API_URLS = {
  LOGIN: '',
  EMPLOYEES: `${BASE_PATH}/employees`
}