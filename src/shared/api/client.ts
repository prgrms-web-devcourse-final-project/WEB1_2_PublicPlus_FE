import {
  Configuration,
  FacilityControllerApi,
  ReviewControllerApi,
  UserControllerApi,
  EmailControllerApi,
  MeetingBoardControllerApi
} from '@/api/generated';

const config = new Configuration({});

export const api = {
  facility: new FacilityControllerApi(config),
  reviewClient: new ReviewControllerApi(config),
  user: new UserControllerApi(config),
  email: new EmailControllerApi(config),
  meetingBoard: new MeetingBoardControllerApi(config)
};
