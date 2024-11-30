import { Configuration, FacilityControllerApi } from '@/api/generated';

const config = new Configuration({});

export const api = {
  facility: new FacilityControllerApi(config)
};
