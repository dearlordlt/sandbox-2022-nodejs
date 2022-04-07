import { environment } from '../environments/environment';

export const APP_CONFIG = {
  api: {
    url: environment.api,
  },
  auth: {
    idToken: 'idToken',
    expiresIn: 'expiresIn',
  },
};
