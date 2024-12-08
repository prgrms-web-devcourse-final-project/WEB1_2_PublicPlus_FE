import {
  FacilityControllerApi,
  ReviewControllerApi,
  UserControllerApi,
  EmailControllerApi,
  ActivityMeetingBoardControllerApi,
  ConfigurationParameters,
  Configuration
} from '@/api/generated';
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';

const getTokenFromCookie = () => {
  const authStorageCookie = Cookies.get('auth-storage');
  const parsedCookie = authStorageCookie ? JSON.parse(authStorageCookie) : null;
  return parsedCookie?.state?.tokens?.access_token;
};

class CustomConfiguration extends Configuration {
  constructor(params: ConfigurationParameters = {}, useCustomConfig = true) {
    const token = getTokenFromCookie();

    super({
      ...params,
      baseOptions: {
        ...params.baseOptions,
        headers: {
          'Content-Type': 'application/json',
          ...(useCustomConfig && token && { Authorization: `Bearer ${token}` }),
          ...params.baseOptions?.headers
        },
        ...(useCustomConfig && { axios: axiosInstance })
      }
    });
  }
}

export const api = {
  facility: new FacilityControllerApi(new CustomConfiguration({}, false)), // 기본 Configuration
  reviewClient: new ReviewControllerApi(new CustomConfiguration({}, false)),
  user: new UserControllerApi(new CustomConfiguration()),
  email: new EmailControllerApi(new CustomConfiguration()),
  meetingBoard: new ActivityMeetingBoardControllerApi(
    new CustomConfiguration({}, false)
  )
};
