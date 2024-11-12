
import { Controllers } from '../../constants';

const baseUrl = 'https://localhost:44350/api/';

export const buildUrl = (controller: Controllers, endpoint?: string | number) => {
    const endpointOrDefault = endpoint ? `/${endpoint}` : '';
    return `${baseUrl}${controller}${endpointOrDefault}`;
};
