import { authHandlers } from './authHandlers';
import { facilityHandlers } from './facilityHandlers';

export const handlers = [...facilityHandlers, ...authHandlers];
