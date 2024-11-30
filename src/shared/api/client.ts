import {
  Configuration,
  FacilityControllerApi,
  ReviewControllerApi
} from '@/api/generated';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || '/api'
});

export const api = {
  facility: new FacilityControllerApi(config),
  reviewClient: new ReviewControllerApi(config)
};
