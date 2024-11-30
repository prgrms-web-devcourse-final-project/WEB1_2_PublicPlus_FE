import { authHandlers } from './authHandlers';
import { facilityHandlers } from './facilityHandlers';
import { reviewHandlers } from './reviewHandlers';

export const handlers = [
  ...facilityHandlers,
  ...authHandlers,
  ...reviewHandlers
];
