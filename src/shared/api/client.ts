import { Configuration, FacilityControllerApi } from '@/api/generated';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || '/api'
});

export const api = {
  facility: new FacilityControllerApi(config)
};
