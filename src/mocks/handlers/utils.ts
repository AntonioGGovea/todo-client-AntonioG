
import { Controllers } from '../../constants';

export const buildUrl = (controller: Controllers, endpoint?: string | number) => {
    const endpointOrDefault = endpoint ? `/${endpoint}` : '';
    return `${import.meta.env.BASE_URL}${controller}${endpointOrDefault}`;
};
