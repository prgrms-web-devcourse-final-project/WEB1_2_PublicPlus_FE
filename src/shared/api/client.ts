import {
  FacilityControllerApi,
  ReviewControllerApi,
  UserControllerApi,
  EmailControllerApi,
  MeetingBoardControllerApi,
  ConfigurationParameters,
  Configuration
} from '@/api/generated';
import Cookies from 'js-cookie';

class CustomConfiguration extends Configuration {
  constructor(params: ConfigurationParameters = {}) {
    const authStorageCookie = Cookies.get('auth-storage');
    const parsedCookie = authStorageCookie
      ? JSON.parse(authStorageCookie)
      : null;
    const token = parsedCookie?.state?.tokens?.access_token;

    super({
      ...params,
      baseOptions: {
        ...params.baseOptions,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...params.baseOptions?.headers
        }
      }
    });
  }
}

export const api = {
  facility: new FacilityControllerApi(new CustomConfiguration()),
  reviewClient: new ReviewControllerApi(new CustomConfiguration()),
  user: new UserControllerApi(new CustomConfiguration()),
  email: new EmailControllerApi(new CustomConfiguration()),
  meetingBoard: new MeetingBoardControllerApi(new CustomConfiguration())
};
