import {
  Configuration,
  FacilityControllerApi,
  MeetingBoardControllerApi,
  ReviewControllerApi
} from '@/api/generated';

const config = new Configuration({});

export const api = {
  facility: new FacilityControllerApi(config),
  reviewClient: new ReviewControllerApi(config),
  meetingBoard: new MeetingBoardControllerApi(config)
};
