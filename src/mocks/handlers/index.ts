import { authHandlers } from './authHandlers';
import { facilityHandlers } from './facilityHandlers';
import { meetingHandlers } from './meetingHandlers';
import { reviewHandlers } from './reviewHandlers';

export const handlers = [
  ...facilityHandlers,
  ...authHandlers,
  ...reviewHandlers,
  ...meetingHandlers
];
